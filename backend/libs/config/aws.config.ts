import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class AwsConfig {
  protected region: string;
  protected endpoint: string;
  protected accessKey: string;
  protected secretKey: string;
  public s3Bucket: string;

  constructor(configService: ConfigService) {
    this.region = configService.getString('AWS_REGION');
    this.endpoint = configService.getString('AWS_ENDPOINT');
    this.accessKey = configService.getString('AWS_ACCESS_KEY');
    this.secretKey = configService.getString('AWS_SECRET_KEY');
    this.s3Bucket = configService.getString('AWS_S3_BUCKET');
  }

  public createAwsOptions() {
    return {
      region: this.region,
      endpoint: this.endpoint,
      s3ForcePathStyle: true,
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
    };
  }
}
