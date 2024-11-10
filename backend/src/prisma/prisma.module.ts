import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Global()//Make the 
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
