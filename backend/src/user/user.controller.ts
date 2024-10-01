import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserInfoDto } from './dtos/edit-user-info.dto';
import { GetCurrentUserId } from 'src/auth/decorators/get-current-user-id.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { userChangePasswordDto } from './dtos/user-change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Patch()
  async editUserInfo(@GetCurrentUserId() id, @Body() EditUserDto: EditUserInfoDto) {
    return this.userService.editUserInfo(id, EditUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @UseGuards(AuthGuard)
  @Post('changePassword')
  changePassword(
    @Body() passwordChangeDto: userChangePasswordDto,
    @GetCurrentUserId() userId,
  ) {
    return this.userService.changeUserPassword(passwordChangeDto, +userId);
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
