import { Injectable } from '@nestjs/common';
import { makeHelloWorld } from 'shared/index';

@Injectable()
export class ExampleService {
  getHello(user: string): string {
    return makeHelloWorld(user);
  }
}
