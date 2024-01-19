import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';

@Module({
  providers: [PasswordRecoveryService],
  controllers: [PasswordRecoveryController]
})
export class PasswordRecoveryModule {}
