import {Body, Controller, Get, Post } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { Public } from 'nestjs-keycloak-admin';

@Controller('anonymous')
export class AnonymousController {
  constructor(private readonly anonumousService: AnonymousService) {}

  @Get()
  @Public()
  async index() {
    return await this.anonumousService.create();
  }

  @Post('logout')
  @Public()
  async logout(@Body() data) {
    return await this.anonumousService.logout(data.uuid);
  }
}
