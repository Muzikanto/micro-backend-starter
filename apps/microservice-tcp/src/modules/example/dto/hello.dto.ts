import { IsNotEmpty, IsString } from 'class-validator';

export class ExampleHelloDto {
  @IsString()
  @IsNotEmpty()
  public user!: string;
}
