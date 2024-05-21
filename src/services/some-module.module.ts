import { Module } from '@nestjs/common';
import { PermissionFactory } from './permission-factory.service';
import { SomeService } from './some-service.service';
import { SomeController } from './some-controller.controller';

@Module({
  imports: [],
  controllers: [SomeController],
  providers: [SomeService, PermissionFactory],
})
export class SomeModule {}
