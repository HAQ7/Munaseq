import {
  BadRequestException,
  HttpException,
  HttpExceptionBody,
  HttpExceptionOptions,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

//This an enum of the listened events by the user
enum events {
  JoinRoom = 'JoinRoom', // to join certain room -> it seems incorrect
  JoinedRooms = 'JoinedRooms', // to view the joined rooms, means the current sockets' rooms
  Rooms = 'Rooms', // retrieve all room in db
  Message = 'Message', // to retrieve a message
  sever = 'server', // to listen to server messages -> it recommend that it appears as notification (similar to event creation notification)
  Error = 'Error',
}
@WebSocketGateway()
@Injectable()
export class ChatService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  //TODO -> online rooms and check if the available room for the user
  //Map of online users' info, where the key is clientId. CTU => Client To User
  onlineClientsCTU = new Map<string, string>();
  //Map of online users' info, where the key is userId. UTC => User To Client
  onlineClientsUTC = new Map<string, string>();

  //socket.io server
  @WebSocketServer()
  server: Server;

  //Function that will listen to every new user connects to the websocket server
  async handleConnection(client: Socket) {
    let userId: string;
    const request = client.handshake;
    const token = this.extractTokenFromHeader(request);

    try {
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      userId = payload.sub;

      //Add the user's info to onlineClients maps
      this.onlineClientsCTU.set(client.id, userId);
      this.onlineClientsUTC.set(userId, client.id);

      //it's better to remove it
      const { firstName: name } = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          firstName: true,
        },
      });

      //Retrieve all rooms
      const rooms = await this.prisma.privateChat.findMany({
        where: {
          Users: {
            some: {
              id: {
                in: [userId],
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        select: { id: true, Messages: { take: 1 } },
      });
      //greeting message
      client.emit(
        events.sever,
        `Hello ${name}, you're connected successfully `,
      );
      if (rooms.length) {
        client.emit(events.sever, 'This is the list of rooms');
        client.emit(events.Rooms, rooms);
      } else {
        client.emit(events.sever, "You haven't any rooms yet..");
      }

      //TODO RETREIVE ALL MESSAGES ---> DONE
    } catch (err) {
      this.handleErrors(client, err);
    }
  }
  handleDisconnect(client: Socket) {
    client.emit(events.sever, 'Disconnected Successfully');
    const userId = this.onlineClientsCTU.get(client.id);
    this.onlineClientsCTU.delete(client.id);
    this.onlineClientsUTC.delete(userId);
    client.disconnect(true);
  }

  //TODO Leaving rooms
  //the client wants to start chatting with the receiver in private room.
  @SubscribeMessage('JoinRoomDM')
  async handleRoomJoining(
    client: Socket,
    { receiverId }: { receiverId: string },
  ) {
    try {
      if (!receiverId) {
        throw new NotFoundException('Please provide a receiver id');
      }

      const senderId = this.onlineClientsCTU.get(client.id);
      /////-------------
      //check if there's already a private chat between the users, if so, join both of them in it
      let room = await this.prisma.privateChat.findFirst({
        where: {
          AND: [
            {
              Users: {
                some: {
                  id: senderId,
                },
              },
            },
            {
              Users: {
                some: {
                  id: receiverId,
                },
              },
            },
          ],
        },
        select: {
          id: true,
        },
      });
      //if the users hasn't a chat between them, then create a new one
      if (!room?.id) {
        //retrive users'ids in order to connect them with the new PrivateChat
        const usersIds = await this.prisma.user.findMany({
          where: {
            id: {
              in: [senderId, receiverId],
            },
          },
          select: { id: true },
        });
        //Cretaing a new PrivateChat and connect users to it
        room = await this.prisma.privateChat.create({
          data: {
            Users: { connect: usersIds },
          },
          select: {
            id: true,
          },
        });
      }
      ///TODO: make a online status that is handled by the front-end
      //check if the receiver is online
      const receiverClientId = this.onlineClientsUTC.get(receiverId);
      if (receiverClientId) {
        //joining the sender to the private chat (i.e. room)
        client.join(room.id);
        //Telling the user that you've joined successfully
        client.emit(
          events.sever,
          `You've joined the room with the id: "${room.id}" successfully`,
        );
        //joining the receiver to the room by getting its socket via server and join
        const receiverClient =
          this.server.sockets.sockets.get(receiverClientId);
        receiverClient.join(room.id);
        receiverClient.emit(
          events.sever,
          `You've joined the room with the id: "${room.id}" successfully`,
        );
      } else {
        //only join the sender to the room
        client.join(room.id);
        client.emit(
          events.sever,
          `You've joined the room with the id: "${room.id}" successfully`,
        );
      }
      ///TODO: try to make it generic, meaning that also the group logic is handled by this event
      ///------------
    } catch (err) {
      this.handleErrors(client, err);
    }
  }

  //it's better to name mere "message" event
  @SubscribeMessage('Message')
  async handleRoomMessage(
    client: Socket,
    { message, roomId }: { message: string; roomId: string },
  ) {
    try {
      const senderId = this.onlineClientsCTU.get(client.id);
      //check if the room exist and the user has joined it
      const room = await this.prisma.privateChat.findUnique({
        where: {
          id: roomId,
          Users: {
            some: { id: senderId },
          },
        },
      });
      if (!room) {
        throw new BadRequestException("the room doesn't exist");
      }
      // create a message
      await this.prisma.message.create({
        data: {
          content: message,
          sender_id: senderId,
          privateChat_id: roomId,
        },
      });

      //emitting the message to the room, the sender will also receive it (front end will check the roomId and sender(to arrange the message to right if the sender is the same as user))
      this.server.to(room.id).emit('Message', {
        roomId: room.id,
        senderId,
        content: message,
      });

      //check if the client has joined this room
    } catch (err) {
      client.emit(events.Error, err.message);
    }
  }

  // Helper methods
  //disconnecting is a little bit harsh, try to send an error that's handled by the front easily
  private handleErrors(
    client: Socket,

    error: HttpException,
  ) {
    client.emit('server', {
      name: error.name || 'undefined',
      message: error.message,
    });
    this.handleDisconnect(client);
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
