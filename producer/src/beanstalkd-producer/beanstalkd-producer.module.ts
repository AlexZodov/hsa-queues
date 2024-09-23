import { Module } from '@nestjs/common';
import { ProducerService } from './services/producer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ProducerService],
})
export class BeanstalkdProducerModule {}
