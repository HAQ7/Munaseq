import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';

import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { EditUserInfoDto, userChangePasswordDto } from './dtos';
import { multerUserLogic } from 'src/utils/multer.logic';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@GetCurrentUserId() id: string) {
    return this.userService.findById(id);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @UseGuards(AuthGuard)
  @Patch()
  @UseInterceptors(multerUserLogic())
  editUserInfo(
    @GetCurrentUserId() id,
    @Body() EditUserDto: EditUserInfoDto,
    @UploadedFiles()
    files: {
      cv?: any;
      profilePicture?: any;
    },
  ) {
    const cvUrl = files?.cv ? files.cv[0].location : null; // S3 location of the CV
    const profilePictureUrl = files?.profilePicture
      ? files.profilePicture[0].location
      : null; // S3 location of the profile picture
    return this.userService.editUserInfo(
      id,
      EditUserDto,
      cvUrl,
      profilePictureUrl,
    );
  }

  @UseGuards(AuthGuard)
  @Post('changePassword')
  changePassword(
    @Body() passwordChangeDto: userChangePasswordDto,
    @GetCurrentUserId() userId,
  ) {
    return this.userService.changeUserPassword(passwordChangeDto, userId);
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
