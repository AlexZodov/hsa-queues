import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { BeanstalkdProducerModule } from './beanstalkd-producer/beanstalkd-producer.module';
import { RedisRdbAofProducerModule } from './redis-rdb-aof-producer/redis-rdb-aof-producer.module';

@Module({
  imports: [ConfigModule, BeanstalkdProducerModule, RedisRdbAofProducerModule],
})
export class AppModule {}
