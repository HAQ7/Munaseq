import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', '..', 'pdfs'), // Serve PDF files
        serveRoot: '/pdfs',
      },
      {
        rootPath: join(__dirname, '..', '..', 'images'), // Serve Image files
        serveRoot: '/images',
      },
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
