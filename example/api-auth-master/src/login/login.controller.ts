import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from 'nestjs-keycloak-admin';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * Social Login With Google
   */
  @Post('google')
  loginGoogle(@Body() data) {
    return this.loginService.googleLogin();
  }

  /**
   * Social Login With Linkedin
   */
  @Post('linkedin')
  loginLinkedin() {
    return this.loginService.linkedinLogin();
  }

  /**
   * Callback Social Login
   */
  @Post('callback')
  @Public()
  loginCallback(@Body() data) {
    return this.loginService.callbackLoginSolcial(data);
  }
}
