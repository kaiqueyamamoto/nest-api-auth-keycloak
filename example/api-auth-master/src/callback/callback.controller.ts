import { Controller, Post, Body } from '@nestjs/common';
import { Public } from 'nestjs-keycloak-admin';
import { CallbackService } from './callback.service';

@Controller('token')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}
  @Post()
  @Public()
  postToken(@Body() data) {
    return this.callbackService.callback(data);
  }
}
