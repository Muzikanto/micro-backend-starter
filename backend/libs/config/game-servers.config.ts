import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class GameServersConfig {
  public readonly count: number;

  constructor(configService: ConfigService) {
    this.count = configService.getNumber('TCP_GAME_SERVER_COUNT');
  }
}
