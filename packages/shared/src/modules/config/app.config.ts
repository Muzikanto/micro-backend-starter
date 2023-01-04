import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class AppConfig {
  public readonly name: string;
  public readonly port: number;
  public readonly isProduction: boolean;

  constructor(configService: ConfigService) {
    this.name = configService.getString('APP_NAME');
    this.port = configService.getNumber('PORT');
    this.isProduction = configService.getString('NODE_ENV') === 'production';
  }
}
