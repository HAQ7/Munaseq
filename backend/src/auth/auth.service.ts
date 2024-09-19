// src/auth/auth.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { userSignUpDto } from './dtos/user-signup.dto';
import { userSignInDto } from './dtos/user-signin.dto';
import { JwtPayload } from './types/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async signIn(signInDto: userSignInDto): Promise<any> {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!(await argon2.verify(user.password, signInDto.password))) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(signUpDto: userSignUpDto) {
    try {
      const hash = await argon2.hash(signUpDto.password);
      await this.prisma.user.create({
        data: {
          email: signUpDto.email,
          password: hash,
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          username: signUpDto.username,
        },
      });
      const signInDto = new userSignInDto();
      signInDto.email = signUpDto.email;
      signInDto.password = signUpDto.password;
      return this.signIn(signInDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new HttpException(
          'This email is already in use',
          HttpStatus.CONFLICT,
        );
      else
        throw new HttpException(
          'An unknown error has occurred',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
