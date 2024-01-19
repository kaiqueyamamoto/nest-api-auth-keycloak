import { Injectable, Logger } from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import axios from 'axios';
import { setApiKey, send } from '@sendgrid/mail';
@Injectable()
export class UserService {
  // logger
  logger: Logger;
  constructor() {
    this.logger = new Logger('UserService >>> ');
  }

  private adminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE,
    realmName: process.env.KEYCLOAK_REALM_NAME,
  });

  async store(data) {
    this.logger.log('-> Authenticated within keycloak - ADMIN API');
    await this.adminClient.auth({
      username: data.user,
      password: data.password,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    this.logger.log('-> Search the user inside the keycloak');
    const user = await this.adminClient.users.find();

    this.logger.log('-> Data found inside keycloak, if they are not null');
    this.logger.debug(user);

    return user;
  }

  async create(data) {
    this.logger.log('-> Authenticated within keycloak - ADMIN API');
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    this.logger.log('-> User data for account creation');
    this.logger.debug(data);

    this.logger.log('-> Create user account within keycloak');
    return await this.adminClient.users.create({
      realm: process.env.KEYCLOAK_REALM_NAME,
      email: data.email,
      username: data.email,
      emailVerified: true,
      groups: [''],
    });
  }

  /**
   * Basic login inside keycloak
   */
  async login(data) {
    this.logger.verbose('-> Authenticated within keycloak - ADMIN API');
    await this.adminClient.auth({
      username: process.env.KEYCLOAK_USER_MASTER,
      password: process.env.KEYCLOAK_PASS_MASTER,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });
    this.logger.log('-> Logout anonymous user');
    this.logger.verbose('-> Find user in Keycloak');
    const user = await this.adminClient.users.find({
      username: data.uuid,
    });
    this.logger.debug(user[0]);
    this.logger.verbose('-> Logout user in Keycloak');
    await this.adminClient.users.logout({
      id: user[0].id,
    });
    this.logger.verbose('-> Logged out user');
    this.logger.verbose('-> Logout user in Keycloak');
    await this.adminClient.users.logout({
      id: process.env.KEYCLOAK_ID_MASTER,
    });

    try {
      /**
       * Authentic inside keycloak
       */
      this.logger.log(
        '-> Authenticates the user inside the api to get the info',
      );
      await this.adminClient.auth({
        username: data.email,
        password: data.password,
        grantType: 'password',
        clientId: process.env.KEYCLOAK_CLIENT,
      });

      /**
       * Get Token
       */
      this.logger.log('-> Get Token and Refresh Token');
      const token = await this.adminClient.getAccessToken();
      const refreshToken = await this.adminClient.refreshToken;

      /**
       * Assemble the return information
       */
      this.logger.log('-> Assemble the return information');
      const userData = await axios.post(process.env.MS_USER + 'search/email/', {
        email_search: data.email,
      });
      const user = userData.data[0];

      /**
       * Return Front
       */
      this.logger.log('-> Return Front');
      return {
        token,
        uuid: user.id,
        refreshToken,
      };
    } catch (error) {
      this.logger.log('-> Basic Login Error');
      this.logger.debug(error);
      return {
        error: 0,
        message: 'Check the information sent',
      };
    }
  }

  /**
   * User role logout
   */
  async logout(data) {
    /**
     * Authenticating within the keycloak service
     */
    this.logger.log('-> Authenticated within keycloak - ADMIN API');
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    /**
     * Check if it is anonymous user or if it is normal user
     */
    try {
      this.logger.log(
        '-> Check if it is anonymous user or if it is normal user',
      );
      const user = await this.adminClient.users.find({ search: data.uuid });

      this.logger.log('-> Logging out the user from within the application');
      const userID = user[0].id;
      await this.adminClient.users.logout({
        id: userID,
      });

      this.logger.log('-> End of Logging Out and Invalidating User Token');
      return { success: true };
    } catch {
      return {
        erro: 0,
        message: 'User dont exist',
      };
    }
  }

  async sendUserEmail({ email, password, firstName }) {
    setApiKey(process.env.SEND_GRID_API);
    try {
      this.logger.log('-> Sending the email via the sendgrid API');
      await send({
        to: email,
        from: process.env.WIVO_EMAIL,
        subject: ``,
        templateId: process.env.EMAIL_TEMPLATE_NEW_PASSWORD,
        dynamicTemplateData: {
          user: {
            profile: { password, email, firstName },
          },
        },
      });
      this.logger.log('-> Email successfully sent');
      return { success: true };
    } catch (e) {
      throw e;
    }
  }
}
