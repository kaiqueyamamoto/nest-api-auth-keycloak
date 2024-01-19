import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import KcAdminClient from '@keycloak/keycloak-admin-client';

@Injectable()
export class AnonymousService {
  logger: Logger;
  constructor() {
    this.logger = new Logger('AnonymousService >>> ');
  }
  private adminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE,
    realmName: process.env.KEYCLOAK_REALM_NAME,
  });

  async create() {
    this.logger.verbose('-> Create the anonymous user');
    const serviceUUID = await axios.get(
      process.env.MS_USER + 'anonymous/create',
    );
    this.logger.debug(serviceUUID.data);

    this.logger.verbose('-> Performs user creation within keycloak');
    const anonymous_user_keycloak = await axios.post(process.env.MS_AUTH, {
      uuid: serviceUUID.data.uuid,
    });
    this.logger.debug(anonymous_user_keycloak.data);
    this.logger.verbose(
      '-> Authenticates within the admin api to get the users token',
    );
    this.logger.debug(serviceUUID.data.uuid);

    await this.adminClient.auth({
      username: serviceUUID.data.uuid,
      password: serviceUUID.data.uuid,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    this.logger.verbose('-> Sin token and now returns the return to the front');
    const anonymousUserToken = await this.adminClient.getAccessToken();
    this.logger.debug(anonymousUserToken);

    return {
      token: anonymousUserToken,
      uuid: serviceUUID.data.uuid,
    };
  }

  async logout(uuid: string) {
    try {
      this.logger.verbose('-> Logout the anonymous user');
      this.logger.verbose('-> Login in Keycloak admin');
      await this.adminClient.auth({
        username: process.env.KEYCLOAK_USER_MASTER,
        password: process.env.KEYCLOAK_PASS_MASTER,
        grantType: 'password',
        clientId: process.env.KEYCLOAK_CLIENT,
      });
      this.logger.verbose('-> Logado Keycloak admin');

      this.logger.verbose('-> Find user in Keycloak');
      const user = await this.adminClient.users.find({
        username: uuid,
      });
      this.logger.debug(user[0]);
      this.logger.verbose('-> Logout user in Keycloak');
      await this.adminClient.users.logout({
        id: user[0].id,
      });
      this.logger.verbose('-> Logged out user');
      return { success: true };
    } catch (error) {
      this.logger.error(error);
      return {
        erro: 0,
        message: 'User dont exist',
      };
    }
  }
}
