import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'node-beanstalk';
import { ConfigService } from '../../config';
@Injectable()
export class ProducerService implements OnModuleInit {
  private QUEUE_NAME = 'beanstalkd_test_queue';
  private MESSAGE_COUNT = 20000;
  private MESSAGE_BATCH = 1000;
  private MESSAGE = 'Potujna nezlamnist`';

  private readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      host: configService.beanstalkd.host,
      port: Number(configService.beanstalkd.port),
    });
  }

  async onModuleInit(): Promise<any> {
    if ('beanstalkd' === this.configService.mode.transport_mode) {
      console.log('started producer beanstalkd');
      await this.client.connect();
      await this.client.use(this.QUEUE_NAME);

      console.log('connected');
      console.time('beanstalkd');
      let counter = 0;
      for (let i = 0; i < this.MESSAGE_COUNT; i++) {
        const callsToBeanstalkd = [];

        for (let j = 0; j < this.MESSAGE_BATCH; j++) {
          counter++;
          callsToBeanstalkd.push(this.client.put(this.MESSAGE, 0, 60));
        }

        if (
          (await Promise.allSettled(callsToBeanstalkd)) &&
          counter % 1000000 == 0
        ) {
          console.timeEnd('beanstalkd');
          console.time('beanstalkd');
        }
      }

      console.timeEnd('beanstalkd');
      console.log('end');
    }
  }
}
