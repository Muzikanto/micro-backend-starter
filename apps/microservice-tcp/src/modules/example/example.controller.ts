import { Controller } from '@nestjs/common';
import { ExampleService } from './example.service';
import { MessagePattern } from '@nestjs/microservices';
import { ExampleHelloDto } from './dto/hello.dto';
import { Args } from 'shared/utils/decorators';

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @MessagePattern('hello')
  helloTcp(@Args() args: ExampleHelloDto): string {
    return this.exampleService.getHello(args.user);
  }
}
