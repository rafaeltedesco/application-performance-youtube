import { Redis } from 'ioredis';

export default class RedisService {
  private instance: Redis;

  constructor() {
    this.instance = new Redis();
  }

  async getData(key: string) {
    const data = await this.instance.get(key);
    return data;
  }
}