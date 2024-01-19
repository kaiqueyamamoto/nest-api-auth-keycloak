import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { GoogleModule } from './google/google.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { ActivationModule } from './activation/activation.module';
import { AnonymousModule } from './anonymous/anonymous.module';
import { CallbackModule } from './callback/callback.module';
import { UserModule } from './user/user.module';
import { KeycloakModuleRoute } from './keycloak/keycloak.module';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import KeycloakModule, {
  AuthGuard,
  ResourceGuard,
} from 'nestjs-keycloak-admin';
import { APP_GUARD } from '@nestjs/core';
import { LoginModule } from './login/login.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KeycloakModule.register({
      baseUrl: process.env.KEYCLOAK_BASE,
      realmName: process.env.KEYCLOAK_REALM_NAME,
      clientId: process.env.KEYCLOAK_JWT_CLIENT,
      clientSecret: process.env.KEYCLOAK_JWT_SCRET,
    }),
    GoogleModule,
    LinkedinModule,
    ActivationModule,
    AnonymousModule,
    CallbackModule,
    UserModule,
    KeycloakModuleRoute,
    PasswordRecoveryModule,
    LoginModule,
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    { provide: APP_GUARD, useClass: ResourceGuard },
    AppService,
  ],
})
export class AppModule {}
