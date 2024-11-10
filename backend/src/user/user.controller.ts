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
import * as multerS3 from 'multer-s3';

import { S3Client } from '@aws-sdk/client-s3';

import * as dotenv from 'dotenv';
dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
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
        { name: 'cv', maxCount: 1 }, // Field for the PDF
        { name: 'profilePicture', maxCount: 1 }, // Field for the profile image
      ],
      {
        storage: multerS3({
          s3: new S3Client({
            region,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
          }),
          bucket: bucketName,
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,

          key: (req, file, cb) => {
            const fileExt = file.originalname.split('.').pop();
            const fileName = `${file.fieldname}-${Date.now()}.${fileExt}`;
            cb(null, fileName); // The file name in the S3 bucket
          },
        }),
        fileFilter: (req, file, cb) => {
          if (
            file.mimetype === 'application/pdf' ||
            file.mimetype.startsWith('image/')
          ) {
            cb(null, true);
          } else {
            cb(
              new Error('Invalid file type, only PDF and images are allowed!'),
              false,
            );
          }
        },
      },
    ),
  )
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
