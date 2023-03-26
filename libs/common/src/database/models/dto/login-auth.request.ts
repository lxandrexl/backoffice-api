import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
