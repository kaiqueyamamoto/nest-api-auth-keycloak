import { Injectable, Logger } from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import axios from 'axios';

@Injectable()
export class KeycloakService {
  logger: Logger;
  constructor() {
    this.logger = new Logger('KeycloakService >>>  ');
  }
  private adminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE,
    realmName: process.env.KEYCLOAK_REALM_NAME,
  });

  private async logoutAdminClient() {
    this.logger.log('-> Get Admin Token ');
    const keycloak_admin_bearer_token = this.adminClient.accessToken;

    this.logger.log('-> Get Information Admin Token ');
    const keycloak_admin_user_info = await axios.get(
      process.env.KEYCLOAK_GET_INFO,
      {
        headers: { Authorization: `Bearer ${keycloak_admin_bearer_token}` },
      },
    );
    const keycloak_admin_user_info_id = keycloak_admin_user_info.data.sub;

    this.logger.verbose('-> Logout Admin Token ');
    await this.adminClient.users.logout({
      id: keycloak_admin_user_info_id,
    });
    this.logger.verbose('-> Logout Admin Token Success ');
  }

  async get() {
    this.logger.verbose('-> Authentication within keycloak');
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });
    const keycloak_find_all_users = await this.adminClient.users.find();
    await this.logoutAdminClient();
    return keycloak_find_all_users;
  }

  async createUserAnonymous(data) {
    this.logger.debug(data);
    await this.adminClient.auth({
      username: process.env.KEYCLOAK_USER_MASTER,
      password: process.env.KEYCLOAK_PASS_MASTER,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    this.logger.verbose('-> logado dentro do keycloak');
    const user = await this.adminClient.users.create({
      realm: process.env.KEYCLOAK_REALM_NAME,
      email: data.uuid,
      username: data.uuid,
      lastName: data.uuid,
      emailVerified: true,
      enabled: true,
      groups: [''],
      credentials: [
        {
          type: 'password',
          value: data.uuid,
          temporary: false,
        },
      ],
    });
    this.logger.verbose('-> user criado');
    this.logger.debug(user);

    this.logoutAdminClient();

    return user;
  }

  async getInfo(data) {
    const user = await axios.get(process.env.KEYCLOAK_GET_INFO, {
      headers: { Authorization: `Bearer ${data.bearer_token}` },
    });
    return user.data;
  }

  async findUser(data) {
    await this.adminClient.auth({
      username: process.env.KEYCLOAK_USER_MASTER,
      password: process.env.KEYCLOAK_PASS_MASTER,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    const keycloak_find_user = await this.adminClient.users.findOne({
      id: data.sub,
    });
    await this.logoutAdminClient();
    return keycloak_find_user;
  }

  /**
   * Detailed search for a user
   */
  async finderUserDetails(data) {
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });
    const keycloak_find_user_details = await this.adminClient.users.findOne({
      id: data.uuid,
    });
    await this.logoutAdminClient();
    return keycloak_find_user_details;
  }

  /**
   * Detailed search for email
   */
  async finderUserEmail(data) {
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });
    const keycloak_find_user_email = await this.adminClient.users.find({
      email: data.email,
    });
    await this.logoutAdminClient();
    return keycloak_find_user_email;
  }

  /**
   * Search the user provider and answer the provider + id
   */
  async findProvider(data) {
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });
    const user = await this.adminClient.users.findOne({ id: data.uuid });
    const providers = user.federatedIdentities;
    const isProvider = (p) => {
      return p.identityProvider == data.provider;
    };
    await this.logoutAdminClient();
    return providers.find(isProvider);
  }

  /**
   * Update user rules within keycloak
   * {
   *  id - role
   * }
   */
  async updateUserRules(data) {
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    if (data.role == 1) {
      await this.adminClient.users.addToGroup({
        id: data.uuid,
        groupId: 'ce95919f-b46a-4ad1-a6d3-f7d3fc05f75a',
      });
      return { success: true };
    } else if (data.role == 2) {
      await this.adminClient.users.addToGroup({
        id: data.uuid,
        groupId: '0e32bf7f-09e6-4a5c-99c4-972c5e8ea6e5',
      });
      await this.logoutAdminClient();
      return { success: true };
    } else {
      await this.logoutAdminClient();
      return { err: 'Check the information sent' };
    }
  }

  /**
   * User password update inside keycloak
   * 1 - UUID User Keycloak
   * 2 - NewPassword
   */
  async passwordRecovery(data) {
    // Authentication
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    // Search by user
    try {
      await this.adminClient.users.update(
        {
          id: data.uuid,
          realm: process.env.KEYCLOAK_REALM_NAME,
        },
        {
          credentials: [
            {
              type: 'password',
              value: data.password,
              temporary: false,
            },
          ],
        },
      );
      return { success: true };
    } catch (e) {
      return { error: 0, message: 'User not found' };
    }
  }
}
