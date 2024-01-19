import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'nestjs-keycloak-admin';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refresh-token')
export class RefreshTokenController {
  // Constructor refreshTokenService
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('')
  @Public()
  // Route to the refresh token
  async refreshToken(@Body() data) {
    // Send the refresh token
    return this.refreshTokenService.index(data.token);
  }
}
