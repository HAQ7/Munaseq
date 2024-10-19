// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
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
})
export class AuthModule {}
