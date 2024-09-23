import { Module } from '@nestjs/common';
import { ConsumerService } from './services/consumer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConsumerService],
})
export class RedisRdbAofConsumerModule {}
