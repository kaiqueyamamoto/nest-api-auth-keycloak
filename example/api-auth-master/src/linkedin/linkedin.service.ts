import { Injectable } from '@nestjs/common';
import { Issuer } from 'openid-client';

@Injectable()
export class LinkedinService {
  async post(data) {
    const idAnonymous = data.uuid;

    const issuer = await Issuer.discover(process.env.KEYCLOAK_ISSUER);
    const Client = new issuer.Client({
      client_id: process.env.KEYCLOAK_CLIENT,
      client_secret: '...',
      redirect_uris: [process.env.URL_CALLBACK],
      response_types: ['code'],
    });

    const provider = 'linkedin';
    const state = JSON.stringify({ provider, uuid_anonymous: idAnonymous });

    return {
      url: Client.authorizationUrl({ state: state, kc_idp_hint: 'linkedin' }),
    };
  }
}
