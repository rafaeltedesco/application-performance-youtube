import { RowDataPacket } from 'mysql2';
import GameRepository from '../repositories/GameRepository';
import { ServiceResponse } from './ServiceResponse';
import { ServiceStatus } from './ServiceStatus';
import RedisService from './RedisService';

export default class GameService {

  private redisKey = 'games';
  private redis: RedisService;

  constructor(private readonly gameRepository: GameRepository) {
    this.redis = new RedisService();
  }

  async getPaginated(page = 1, limit = 10): Promise<ServiceResponse<RowDataPacket>> {
    const games = await this.gameRepository.get(page, limit);
    const cached = await this.redis.getData(this.redisKey);
    if (!cached) {
      return {
        status: ServiceStatus.OK,
        data: games,
        page,
        limit,
      }
    }    
    const totalPages = this.getTotalPages(Number(cached), limit);
    if (page > totalPages || page <= 0) return { status: 'NOT_FOUND', data: {
      error: {
        message: 'Page Not Found',
      }
    }}

    const remainingPages = this.getRemainingPages(totalPages, page);
    return {
      status: ServiceStatus.OK,
      data: games,
      page,
      limit,
      totalPages,
      remainingPages
    }
  }

  private getTotalPages(gamesCount: number, limit: number): number {
    return Math.ceil(gamesCount / limit);
  }

  private getRemainingPages(totalPages: number, currentPage: number): number {
    return totalPages - currentPage;
  }
}