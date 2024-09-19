import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto } from './dtos/edit-user-info.dto';
import { GetCurrentUserId } from 'src/auth/decorators/get-current-user-id.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Patch()
  async editUserInfo(@GetCurrentUserId() id, @Body() EditUserDto: EditUserDto) {
    return this.userService.editUserInfo(id, EditUserDto);
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
