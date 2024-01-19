import { Injectable, Logger } from '@nestjs/common';
import { Issuer } from 'openid-client';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import axios from 'axios';

@Injectable()
export class CallbackService {
  logger: Logger;
  constructor() {
    this.logger = new Logger('CallbackService');
  }

  private adminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE,
    realmName: process.env.KEYCLOAK_REALM_NAME,
  });

  async callback(data) {
    const { provider, code } = data;

    await this.adminClient.auth({
      username: process.env.KEYCLOAK_USER_MASTER,
      password: process.env.KEYCLOAK_PASS_MASTER,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    const issuer = await Issuer.discover(process.env.KEYCLOAK_ISSUER);
    const client = new issuer.Client({
      client_id: process.env.KEYCLOAK_CLIENT,
      client_secret: '...',
      redirect_uri: [process.env.URL_CALLBACK],
      response_types: ['id_token'],
    });
    const oauth2Token = await client.callback(
      process.env.URL_CALLBACK,
      { code: code },
      { code_verifier: code },
    );
    this.logger.debug(oauth2Token);

    const userData = await axios.get(process.env.KEYCLOAK_GET_INFO, {
      headers: { Authorization: 'Bearer ' + oauth2Token.access_token },
    });
    this.logger.debug(userData.data);

    const userAPI = await this.adminClient.users.findOne({
      id: userData.data.sub,
    });

    this.logger.verbose('-> Return information from the chosen providers api');
    this.logger.debug(userAPI);

    this.logger.log('-> Return to front');
    this.logger.debug(oauth2Token);

    this.logger.verbose('-> Avatar URL');
    const avatar_url =
      userAPI.attributes == undefined || userAPI.attributes == null
        ? 'https://ui-avatars.com/api/?background=006dfb&color=fff&name=' +
          userData.data.name
        : userAPI.attributes.provider_avatar_url[0];
    this.logger.debug(avatar_url);

    this.logger.verbose(' >>> Logout anonymous user');
    const anonymous_request = await axios.post(
      process.env.MS_USER + `search/anonymousId`,
      {
        user_id: userData.data.sub,
      },
    );
    const anonymous_user_data = anonymous_request.data;
    this.logger.debug(anonymous_user_data);

    /**
     * Pesquisa quail é o id do usuario anonymous
     * dentro do keycloak
     */
    this.logger.verbose(' >>> Search anonymous user in Keycloak');
    const anonymous_user_keycloak = await this.adminClient.users.find({
      firstName: anonymous_user_data.user_id,
    });
    this.logger.verbose(anonymous_user_keycloak);

    /**
     * Verificar se o usuario já tem uma conta criada dentro da plataforma com base no email
     * que vem no retorno do callback dos social providers
     */
    this.logger.verbose(' >>> Check if user exists within postgres');
    const callback_seach_user = await axios.post(
      process.env.MS_USER + '/search/email/',
      {
        email_search: userData.data.email,
      },
    );
    this.logger.verbose(callback_seach_user.data);
    this.logger.verbose(callback_seach_user.data.length);

    return {
      token: oauth2Token.access_token,
      refreshToken: oauth2Token.refresh_token,
      user_status:
        callback_seach_user.data.length == 0 ? 'no_create' : 'created',
      data: {
        uuid: userData.data.sub,
        email: userData.data.email,
        first_name: userData.data.given_name,
        last_name: userData.data.family_name,
        display_name: userData.data.name,
        avatar_url,
        provider: data.provider == null ? null : data.provider,
      },
    };
  }
}
