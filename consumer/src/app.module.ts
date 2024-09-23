import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { BeanstalkdConsumerModule } from './beanstalkd-consumer/beanstalkd-consumer.module';
import { RedisRdbAofConsumerModule } from './redis-rdb-aof-consumer/redis-rdb-aof-consumer.module';

@Module({
  imports: [ConfigModule, BeanstalkdConsumerModule, RedisRdbAofConsumerModule],
})
export class AppModule {}
