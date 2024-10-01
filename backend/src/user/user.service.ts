import { userChangePasswordDto } from './dtos/user-change-password.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserInfoDto } from './dtos/edit-user-info.dto';
import * as argon2 from 'argon2';
import { NotFoundError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
    try {
      const deletedUsers = await this.prisma.user.deleteMany({});
      return { count: deletedUsers.count }; // Return the count of deleted users
    } catch (error) {
      throw new HttpException(
        'Error deleting users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('No account with the provided id has been found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch (error) {
      // Catch specific error when a record is not found
      if (error instanceof NotFoundError) {
        throw new HttpException('No account with the provided email has been found', HttpStatus.NOT_FOUND);
      }
      // Handle other known request errors (if applicable)
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Database error', HttpStatus.BAD_REQUEST);
      }
      // For other unexpected errors, throw internal server error
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUsername(username: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          username,
        },
      });
    } catch (error) {
      // Catch specific error when a record is not found
      if (error instanceof NotFoundError) {
        throw new HttpException('No account with the provided username has been found', HttpStatus.NOT_FOUND);
      }
      // Handle other known request errors (if applicable)
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Database error', HttpStatus.BAD_REQUEST);
      }
      // For other unexpected errors, throw internal server error
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
