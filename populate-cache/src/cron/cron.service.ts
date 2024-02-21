import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MySqlService } from 'src/mysql/mysql.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CronService {
  constructor(
    private readonly redisService: RedisService,
    private readonly mysqlService: MySqlService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async populateCache(tableName = 'games'): Promise<void> {
    console.log('Running cron job');
    const total = await this.mysqlService.countGames();
    await this.redisService.set(tableName, JSON.stringify(total));
    console.log('Cache populated');
  }
}
