// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { userSignInDto, userSignUpDto } from './dtos';

import { FileFieldsInterceptor } from '@nestjs/platform-express';

import * as multerS3 from 'multer-s3';

import { S3Client } from '@aws-sdk/client-s3';

import * as dotenv from 'dotenv';
dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  signIn(@Body() signInDto: userSignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Post('signUp')
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
  signUp(
    @Body() body: userSignUpDto,
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

    return this.authService.signup(body, profilePictureUrl, cvUrl);
  }
}
