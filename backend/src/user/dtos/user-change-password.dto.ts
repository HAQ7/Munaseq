import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
export class userChangePasswordDto {
  @IsNotEmpty()
  newpassword: string;

  @IsNotEmpty()
  oldpassword: string;
}
