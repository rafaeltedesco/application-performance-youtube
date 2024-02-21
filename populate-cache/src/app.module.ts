import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CronService } from './cron/cron.service';
import { MySqlService } from './mysql/mysql.service';
import { RedisService } from './redis/redis.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  providers: [CronService, MySqlService, RedisService],
})
export class AppModule {}
