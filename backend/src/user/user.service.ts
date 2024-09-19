import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dtos/edit-user-info.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async deleteUser(id: number) {
    console.log(id);
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

  async editUserInfo(id: number, EditUserDto: EditUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: {
        ...EditUserDto,
      },
    });
  }

  // this should not return all the user information including password and such
  async findAllUsers() {
    return this.prisma.user.findMany();
  }
}
