import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as process from 'process';

dotenvExpand.expand(config());

@Injectable()
export class ConfigService {
  appProject = 'hsa_queues_producer';
  server = {
    port: Number(process.env.PORT) || 3000,
  };

  redis_rdb = {
    host: process.env.REDIS_RDB_HOST,
    port: process.env.REDIS_RDB_PORT,
  };

  redis_aof = {
    host: process.env.REDIS_AOF_HOST,
    port: process.env.REDIS_AOF_PORT,
  };

  beanstalkd = {
    host: process.env.BEANSTALKD_HOST,
    port: process.env.BEANSTALKD_PORT,
  };

  mode = {
    transport_mode: process.env.MODE,
  };

  isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
