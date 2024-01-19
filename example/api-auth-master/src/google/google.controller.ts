import { Controller, Post, Body } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post()
  async getGoogle(@Body() data) {
    return await this.googleService.post(data);
  }
}
