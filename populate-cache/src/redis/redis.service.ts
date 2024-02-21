import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;
  constructor() {
    this.client = new Redis();
  }
  async get(key: string) {
    return this.client.get(key);
  }
  async set(key: string, value: string) {
    return this.client.set(key, value);
  }
  async del(key: string) {
    return this.client.del(key);
  }
  async flush() {
    return this.client.flushall();
  }
}
