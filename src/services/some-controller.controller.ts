import { Controller, Get } from '@nestjs/common';
import { SomeService } from './some-service.service';

@Controller('some')
export class SomeController {
  constructor(private readonly someService: SomeService) {}

  @Get('action')
  async someAction() {
    try {
      const message = await this.someService.someAction();
      return { message };
    } catch (error) {
      return { error: error.message };
    }
  }
}
