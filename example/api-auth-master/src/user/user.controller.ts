import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Basic Login
   */
  @Post('login')
  login(@Body() data) {
    return this.userService.login(data);
  }

  @Post('create')
  create(@Body() data) {
    return this.userService.create(data);
  }

  @Post('logout')
  logout(@Body() data) {
    return this.userService.logout(data);
  }

  @Post('create/user/without-provider')
  createUserWithoutProvider(@Body() data) {
    return this.userService.sendUserEmail(data);
  }

  @Post('send-user-email')
  send(@Body() data) {
    return this.userService.sendUserEmail(data);
  }
}
