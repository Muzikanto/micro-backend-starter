import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  public readonly id: string;
  public readonly pname: string;
  public readonly name: string;
  public readonly port: number;
  public readonly isProduction: boolean;
  public readonly mode: string;
  public readonly host: string;
  public readonly url: string;

  constructor(configService: ConfigService) {
    this.name = configService.getString('APP_NAME');
    this.port = configService.getNumber('PORT');
    this.host = configService.getString('HOST');
    this.isProduction = configService.getString('NODE_ENV') === 'production';
    this.mode = configService.getString('NODE_ENV');
    this.id = configService.getString('APP_ID');
    this.pname = configService.getString('APP_PNAME');
    this.url = `${this.host}:${this.port}`;
  }
}
