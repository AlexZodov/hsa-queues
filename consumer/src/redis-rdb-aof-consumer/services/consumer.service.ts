import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../../config';
const redis = require('redis');
import { RedisClientType } from 'redis';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private QUEUE_NAME_RDB = 'redis_rdb_test_queue';
  private QUEUE_NAME_AOF = 'redis_aof_test_queue';
  private MESSAGE_ORIGIN = 'Potujna nezlamnist`';
  private MESSAGE_CONVERTED = 'Nezlamna Potujnist`';

  private readonly client: RedisClientType;
  private readonly queueName: string;

  constructor(private readonly configService: ConfigService) {
    if ('redis_rdb' === this.configService.mode.transport_mode) {
      this.client = redis.createClient({
        url:
          'redis://' +
          configService.redis_rdb.host +
          ':' +
          configService.redis_rdb.port,
      });
      this.queueName = this.QUEUE_NAME_RDB;
    } else if ('redis_aof' === this.configService.mode.transport_mode) {
      this.client = redis.createClient({
        url:
          'redis://' +
          configService.redis_aof.host +
          ':' +
          configService.redis_aof.port,
      });
      this.queueName = this.QUEUE_NAME_AOF;
    }
  }

  async onModuleInit(): Promise<any> {
    if (
      'redis_rdb' === this.configService.mode.transport_mode ||
      'redis_aof' === this.configService.mode.transport_mode
    ) {
      await this.client.connect();
      const exactRedisMode = this.configService.mode.transport_mode;

      console.log('started consumer ' + exactRedisMode);

      let counter = 0;
      console.time(exactRedisMode);
      await this.client.subscribe(this.queueName, (message: string) => {
        // if (counter % 10000 == 0) {
        //   if (message.startsWith(this.MESSAGE_ORIGIN, 0)) {
        //     console.log(
        //       'Original message - ' +
        //         message +
        //         ' ; Converted message - ' +
        //         this.MESSAGE_CONVERTED,
        //     );
        //   }
        // }
        counter++;
        if (counter % 1000000 == 0) {
          console.timeEnd(exactRedisMode);
          console.time(exactRedisMode);
        }
      });
    }
  }
}
