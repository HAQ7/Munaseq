import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user-info.dto';
import { GetCurrentUserId } from 'src/auth/decorators/get-current-user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  @Patch(':id')
  async editUserInfo(
    @Param('id') id: string,
    @Body() EditUserDto: EditUserDto,
  ) {
    return this.userService.editUserInfo(Number(id), EditUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@GetCurrentUserId() id) {
    return this.userService.deleteUser(id);
  }
  //   @Delete()
  //   async deleteAll() {
  //     return this.userService.deleteAll();
  //   }
}
