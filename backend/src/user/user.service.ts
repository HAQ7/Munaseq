import { userChangePasswordDto } from './dtos/user-change-password.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserInfoDto } from './dtos/edit-user-info.dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async deleteUser(id: number) {
    await this.prisma.event.deleteMany({
      where: {
        eventCreatorId: id,
      },
    });
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async deleteAll() {
    return this.prisma.user.deleteMany();
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async editUserInfo(id: number, EditUserDto: EditUserInfoDto) {
    try {
      return this.prisma.user.update({
        where: { id: id },
        data: {
          ...EditUserDto,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Invalid Information Provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // this should not return all the user information including password and such
  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async changeUserPassword(
    passwordChangeDto: userChangePasswordDto,
    userId: number,
  ) {
    // Retrieve the user's current hashed password
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // Verify the old password matches the stored hash
    const isOldPasswordValid = await argon2.verify(
      user.password,
      passwordChangeDto.oldpassword,
    );

    if (!isOldPasswordValid) {
      throw new HttpException(
        'Invalid Information Provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Hash the new password
    const hash = await argon2.hash(passwordChangeDto.newpassword);

    // Update the user's password
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hash,
      },
    });
  }
}
