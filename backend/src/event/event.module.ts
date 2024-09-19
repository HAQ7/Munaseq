import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, EventModule, PrismaModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
