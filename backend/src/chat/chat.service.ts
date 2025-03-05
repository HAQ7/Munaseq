import {
  HttpException,
  HttpExceptionOptions,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
@WebSocketGateway()
@Injectable()
export class ChatService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //Array of online users' info
  onlineClients: { userId: string; clientId: string }[] = [];

  //socket.io server
  @WebSocketServer()
  server: Server;

  //Function that will listen to every new user connects to the websocket server
  async handleConnection(client: Socket, data: { userId: string }) {
    let userId;
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

      //Add the user to onlineClients array
      this.onlineClients.push({ userId, clientId: client.id });
      const { firstName: name } = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          firstName: true,
        },
      });
      client.emit(
        events.sever,
        `Hello ${name}, you're connected successfully `,
      );
      //TODO RETREIVE ALL MESSAGES
    } catch (err) {
      this.handleErrors(client, err);
    }
  }
  handleDisconnect(client: Socket) {
    client.emit(events.sever, 'Disconnected Successfully');
    client.disconnect(true);
  }
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
enum events {
  directMessage = 'directMessage',
  groupMessage = 'groupMessage',
  sever = 'server',
}
