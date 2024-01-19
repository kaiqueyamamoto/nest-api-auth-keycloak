import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('user')
  getUser(): object {
    return this.appService.store();
  }
}
