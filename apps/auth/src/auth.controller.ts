import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { LoginAuthRequest } from '@app/common/database/models/dto/login-auth.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async login(
    @Body() { email, password }: LoginAuthRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(email, password);
    await this.authService.login(user, response);
    response.send({ payload: user });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: any) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
    response.send({ message: 'ok' });
  }
}
