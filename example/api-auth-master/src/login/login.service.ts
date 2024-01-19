import { Injectable } from '@nestjs/common';
import { Issuer } from 'openid-client';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import axios from 'axios';

@Injectable()
export class LoginService {
  /**
   * Logging into the keycloak service as admin
   */
  private adminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE,
    realmName: process.env.KEYCLOAK_REALM_NAME,
  });

  /**
   * Openid Conect - Settings
   */
  async openidLogin(provider) {
    console.log('=========== openidLogin  =======');
    console.log(provider);
    try {
      const issuer = await Issuer.discover(process.env.KEYCLOAK_ISSUER);
      const Client = new issuer.Client({
        client_id: process.env.KEYCLOAK_CLIENT,
        client_secret: '...',
        redirect_uris: [process.env.URL_CALLBACK_AUTH],
        response_types: ['code'],
      });
      console.log('create url');
      const url = Client.authorizationUrl({
        provider: provider,
        kc_idp_hint: provider,
      });
      console.log('url', url);
      return {
        url: Client.authorizationUrl({
          provider: provider,
          kc_idp_hint: provider,
        }),
      };
    } catch (error) {
      console.log(error);
      return {
        error: 1,
        message: 'Check the information sent or the selected email',
      };
    }
  }

  /**
   * Callback Social
   */
  async callbackLoginSolcial(data) {
    try {
      /**
       * Get the provider and code to perform validation
       */
      const { provider, code } = data;
      console.log(provider, code);

      /**
       * Authenticates within the keycloak ADMIN API
       */
      await this.adminClient.auth({
        username: process.env.KEYCLOAK_USER_MASTER,
        password: process.env.KEYCLOAK_PASS_MASTER,
        grantType: 'password',
        clientId: process.env.KEYCLOAK_CLIENT,
      });

      /**
       * Authenticating with the protocol to make the user call
       */
      const issuer = await Issuer.discover(process.env.KEYCLOAK_ISSUER);
      const client = new issuer.Client({
        client_id: process.env.KEYCLOAK_CLIENT,
        client_secret: '...',
        redirect_uri: [process.env.URL_CALLBACK_AUTH],
        response_types: ['id_token'],
      });

      /**
       * Return of the protocol
       */
      const oauth2Token = await client.callback(
        process.env.URL_CALLBACK_AUTH,
        { code: code },
        { code_verifier: code },
      );

      /**
       * Endpoint call to get user information
       */
      const userData = await axios.get(process.env.KEYCLOAK_GET_INFO, {
        headers: { Authorization: 'Bearer ' + oauth2Token.access_token },
      });

      /**
       * Return information from the chosen providers api
       */
      const userAPI = await this.adminClient.users.findOne({
        id: userData.data.sub,
      });
      const uuid = userAPI.id;
      console.log(uuid);

      /**
       * Check if the user exists
       */
      const userExists = await axios.post(process.env.MS_USER + 'get', {
        uuid,
      });
      console.log(userExists.data);
      if (userExists.data.length == 0) {
        return {
          error: 0,
          message: 'Unregistered User',
        };
      }

      /**
       * Return Front
       */
      console.log('return front');
      console.log(oauth2Token.access_token);
      console.log(oauth2Token.refresh_token);
      return {
        token: oauth2Token.access_token,
        refreshToken: oauth2Token.refresh_token,
        uuid,
        provider,
      };
    } catch (error) {
      console.log(error);
      return {
        error: 1,
        message: 'Check the information sent or the selected email',
      };
    }
  }

  /**
   * Google
   */
  async googleLogin() {
    return this.openidLogin('google');
  }

  /**
   * Linkedin
   */
  async linkedinLogin() {
    return this.openidLogin('linkedin');
  }
}
