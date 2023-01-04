import { Controller, Get } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectExample } from './utils/injection';

@Controller()
export class ExampleController {
  constructor(@InjectExample() private readonly exampleService: ClientProxy) {}

  @Get()
  public async getHello(): Promise<string> {
    try {
      const response: string = await firstValueFrom(
        this.exampleService.send('hello', {
          user: 'World',
        })
      );

      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
