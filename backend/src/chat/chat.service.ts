import {
  HttpException,
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
enum events {
  JoinRoom = 'JoinRoom',
  Rooms = 'Rooms',
  Message = 'Message',
  sever = 'server',
}
@WebSocketGateway()
@Injectable()
export class ChatService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

      //Retrieve all chats
      const chats = await this.prisma.privateChat.findMany({
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
      if (chats.length) {
        client.emit(events.Rooms, chats);
      } else {
        client.emit(events.sever, "You haven't any chats yet..");
      }

      //TODO RETREIVE ALL MESSAGES
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
      let roomId = await this.prisma.privateChat.findFirst({
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
      if (!roomId?.id) {
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
        roomId = await this.prisma.privateChat.create({
          data: {
            Users: { connect: usersIds },
          },
          select: {
            id: true,
          },
        });
      }
      //check if the receiver is online
      const receiverClientId = this.onlineClientsUTC.get(receiverId);
      if (receiverClientId) {
        //joining the sender to the private chat (i.e. room)
        client.join(roomId.id);
        //joining the receiver to the room by getting its socket via server and join
        const receiverClient =
          this.server.sockets.sockets.get(receiverClientId);
        receiverClient.join(roomId.id);
      } else {
        //only join the sender to the room
        client.join(roomId.id);
      }
      client.emit('JoinRoomDM', {
        roomId,
      });
      this.server.to(roomId.id).emit('JoinRoomDM', 'ارحبوا نفداكم');
      ///------------
    } catch (err) {
      this.handleErrors(client, err);
    }
  }
  @SubscribeMessage('RoomMessage')
  handleRoomMessage(
    client: Socket,
    { message, roomId }: { message: string; roomId: string },
  ) {}

  // Helper methods
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
