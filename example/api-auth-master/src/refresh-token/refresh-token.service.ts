import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const querystring = require('querystring');

@Injectable()
export class RefreshTokenService {
  // Start lib logger
  logger: Logger;
  constructor() {
    // Instantiating the debug lib
    this.logger = new Logger('RefreshTokenService >>> ');
  }

  // Methods to be call api keycloak for new refresh token and refresh token
  async index(refreshToken: string) {
    try {
      const data = querystring.stringify({
        client_id: process.env.KEYCLOAK_CLIENT,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      this.logger.debug(data);
      // GET in route keycloak for update refresh token and tokens
      const refresh_token = await axios.post(process.env.KEYCLOAK_TOKEN, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // Debug token with Logger
      this.logger.debug(refresh_token.data);
      return {
        access_token: refresh_token.data.access_token,
        refresh_token: refresh_token.data.refresh_token,
      };
    } catch (error) {
      console.log(error.message);
      // return { error: error.message };
    }
  }
}
