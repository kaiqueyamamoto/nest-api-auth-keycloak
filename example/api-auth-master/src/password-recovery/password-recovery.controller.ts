import { Body, Controller, Get, Post } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { generate } from 'generate-password';

@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly forgotPasswordService: PasswordRecoveryService,
  ) {}

  /**
   * Data for password recovery:
   */
  @Post()
  passworRecovery(@Body() data) {
    return this.forgotPasswordService.forgotPassword(data);
  }

  /*
   * Route to generate new password
   *
  @Get()
  generatePassword() {
    const password = generate({
      length: 10,
      numbers: true,
    });
    return password;
  }*/
}
