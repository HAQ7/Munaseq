import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'images'),
      serveRoot: '/images',
    }),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
