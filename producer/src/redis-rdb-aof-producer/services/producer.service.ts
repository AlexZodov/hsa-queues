import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../../config';
const redis = require('redis');
import { /*redis,*/ RedisClientType } from 'redis';

@Injectable()
export class ProducerService implements OnModuleInit {
  private QUEUE_NAME_RDB = 'redis_rdb_test_queue';
  private QUEUE_NAME_AOF = 'redis_aof_test_queue';
  private MESSAGE_COUNT = 20000;
  private MESSAGE_BATCH = 1000;
  private MESSAGE = 'Potujna nezlamnist`';

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
      const exactRedisMode = this.configService.mode.transport_mode;
      console.log('started producer ' + exactRedisMode);
      await this.client.connect();

      console.log('connected');
      console.time(exactRedisMode);
      let counter = 0;
      for (let i = 0; i < this.MESSAGE_COUNT; i++) {
        const callsToRedis = [];

        for (let j = 0; j < this.MESSAGE_BATCH; j++) {
          counter++;
          callsToRedis.push(
            await this.client.publish(
              this.queueName,
              this.MESSAGE + '-' + i + '-' + j,
            ),
          );
        }

        if (
          (await Promise.allSettled(callsToRedis)) &&
          counter % 1000000 == 0
        ) {
          console.timeEnd(exactRedisMode);
          console.time(exactRedisMode);
        }
      }

      console.timeEnd(exactRedisMode);
      console.log('end');
    }
  }
}
