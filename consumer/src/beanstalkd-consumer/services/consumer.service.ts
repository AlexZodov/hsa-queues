import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'node-beanstalk';
import { ConfigService } from '../../config';
@Injectable()
export class ConsumerService implements OnModuleInit {
  private QUEUE_NAME = 'beanstalkd_test_queue';
  private MESSAGE_ORIGIN = 'Potujna nezlamnist`';
  private MESSAGE_CONVERTED = 'Nezlamna Potujnist`';

  private readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      host: configService.beanstalkd.host,
      port: Number(configService.beanstalkd.port),
    });
  }

  async onModuleInit(): Promise<any> {
    if ('beanstalkd' === this.configService.mode.transport_mode) {
      console.log('started consumer beanstalkd');

      await this.client.connect();
      await this.client.use(this.QUEUE_NAME);
      await this.client.watch(this.QUEUE_NAME);

      let counter = 0;
      console.time('beanstalkd');
      while (true) {
        const job = await this.client.reserve();
        // if (counter % 10000 == 0) {
        //   if (job.payload === this.MESSAGE_ORIGIN) {
        //     console.log(
        //       'Original message - ' +
        //         job.payload +
        //         ' ; Converted message - ' +
        //         this.MESSAGE_CONVERTED,
        //     );
        //   }
        // }
        counter++;
        if (counter % 1000000 == 0) {
          console.timeEnd('beanstalkd');
          console.time('beanstalkd');
        }
      }
    }
  }
}
