import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { userSignInDto, userSignUpDto } from './dtos';
import { multerUserLogic } from 'src/utils/multer.logic';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  signIn(@Body() signInDto: userSignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Post('signUp')
  @UseInterceptors(multerUserLogic())
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
      : null; // S3 location of the profile pictures

    return this.authService.signup(body, profilePictureUrl, cvUrl);
  }
}
