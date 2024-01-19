import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import KcAdminClient from '@keycloak/keycloak-admin-client';

@Injectable()
export class LoginService {
  /**
   * https://www.npmjs.com/package/@keycloak/keycloak-admin-client
   */
  private adminClientKc = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE_URL,
    realmName: process.env.KEYCLOAK_REALM,
    
  })

  async create(createLoginDto: CreateLoginDto) {
    await this.adminClientKc.auth({
      username: process.env.KC_USER,
      password: process.env.KC_PASS,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
