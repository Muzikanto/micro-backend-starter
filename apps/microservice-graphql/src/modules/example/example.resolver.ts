import { ExampleService } from './example.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}

  @Query(() => String)
  graphqlMethod(): string {
    return this.exampleService.getHello('World');
  }
}
