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
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  getHello(@Body() body: any, @Res() res: any) {
    res.json({ email: body.email, password: body.password });
  }

  @Post('signIn')
  signIn(@Body() signInDto: userSignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signUp')
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
  signUp(
    @Body() body: userSignUpDto,
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

    return this.authService.signup(body, profilePicture, cv);
  }
}
