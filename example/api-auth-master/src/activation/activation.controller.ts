import { Controller, Post, Get, Body } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {
  constructor(private readonly activationService: ActivationService) {}

  @Post('sms')
  async smsActivation(@Body() data) {
    return this.activationService.sendActivePhone(data);
  }

  @Post('sms/activation')
  async smsActivationCode(@Body() data) {
    return this.activationService.smsActivate(data);
  }

  /**
   * REENVIO DO CÓDIGO POR SMS
   * */
  @Post('resend/sms')
  async smsResend(@Body() data) {
    return this.activationService.sendActivePhone(data);
  }
}
