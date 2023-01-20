import { Injectable } from '@nestjs/common';
import { makeHelloWorld } from 'shared';

@Injectable()
export class ExampleService {
  getHello(user: string): string {
    return makeHelloWorld(user);
  }
}
