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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cv', maxCount: 1 }, // The field name for the PDF file
        { name: 'profilePicture', maxCount: 1 }, // The field name for the image file
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            // Check file type to determine where to save the file
            if (file.mimetype === 'application/pdf') {
              cb(null, './pdfs'); // Save PDFs in the pdfs folder
            } else if (file.mimetype.startsWith('image/')) {
              cb(null, './images'); // Save images in the images folder
            } else {
              cb(new Error('Invalid file type'), null); // Handle invalid file types
            }
          },
          filename: (req, file, cb) => {
            // Custom filename: original name + timestamp to avoid overwrites
            const name = file.originalname.split('.')[0]; // Get original name
            const fileExtName = extname(file.originalname); // Get file extension
            const timestamp = Date.now(); // Add a timestamp for uniqueness
            cb(null, `${name}-${timestamp}${fileExtName}`);
          },
        }),
      },
    ),
  )
  editUserInfo(
    @GetCurrentUserId() id,
    @Body() EditUserDto: EditUserInfoDto,
    @UploadedFiles()
    files: {
      cv?: Express.Multer.File[];
      profilePicture?: Express.Multer.File[];
    },
  ) {
    const cv = files?.cv ? files.cv[0] : null;
    const profilePicture = files?.profilePicture
      ? files.profilePicture[0]
      : null;
    return this.userService.editUserInfo(id, EditUserDto, cv, profilePicture);
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
  deleteUser(@GetCurrentUserId() id) {
    return this.userService.deleteUser(id);
  }
  //   @Delete()
  //   async deleteAll() {
  //     return this.userService.deleteAll();
  //   }
}
