import { Controller, Get, Post, Body } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}
  /*
  @Get()
  async getLinkedin() {
    return await this.linkedinService.get();
  }*/

  @Post()
  async postLinkedin(@Body() data) {
    return await this.linkedinService.post(data);
  }
}
