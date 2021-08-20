import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }
}
