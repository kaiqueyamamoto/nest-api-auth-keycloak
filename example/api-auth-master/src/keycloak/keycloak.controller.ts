import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'nestjs-keycloak-admin';
import { KeycloakService } from './keycloak.service';

@Controller('keycloak')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  /**
   * All users inside keycloak
   */
  @Get()
  async getAllusers() {
    return await this.keycloakService.get();
  }

  /**
   * Creation of anonymous user
   */
  @Post('user/create/anonymous')
  @Public()
  async createUserAnonymous(@Body() data) {
    console.log(data);
    return this.keycloakService.createUserAnonymous(data);
  }

  /**
   * Basic information inside keycloak
   */
  @Post('user/info')
  @Public()
  async getInfo(@Body() data) {
    return this.keycloakService.getInfo(data);
  }

  /**
   * Search for detailed basic data
   * */
  @Post('/user/find')
  async findUser(@Body() data) {
    return this.keycloakService.findUser(data);
  }

  /**
   * Detailed search for a user
   */
  @Post('/user/details')
  @Public()
  async finderUserDetails(@Body() data) {
    return this.keycloakService.finderUserDetails(data);
  }

  /**
   * Detailed search for a email
   */
  @Post('/user/search/email')
  @Public()
  async finderUserEmail(@Body() data) {
    return this.keycloakService.finderUserEmail(data);
  }

  /**
   * Search for user provider
   */
  @Post('/user/search/provider')
  @Public()
  async finderUserProvider(@Body() data) {
    return this.keycloakService.findProvider(data);
  }

  /**
   * Update user rules within keycloak
   */
  @Post('/user/update/role')
  @Public()
  async updateUserRules(@Body() data) {
    return this.keycloakService.updateUserRules(data);
  }
}
