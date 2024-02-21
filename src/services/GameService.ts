import { RowDataPacket } from 'mysql2';
import GameRepository from '../repositories/GameRepository';
import { ServiceResponse } from './ServiceResponse';
import { ServiceStatus } from './ServiceStatus';

export default class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async getPaginated(page = 1, limit = 10): Promise<ServiceResponse<RowDataPacket>> {
    const totalPages = await this.getTotalPages(limit);    
    if (page > totalPages || page <= 0) return { status: 'NOT_FOUND', data: {
      error: {
        message: 'Page Not Found',
      }
    }}
    const games = await this.gameRepository.get(page, limit);
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

  private async getTotalPages(limit: number): Promise<number> {
    const gamesCount = await this.gameRepository.getElementsCount();
    return Math.ceil(gamesCount / limit);
  }

  private getRemainingPages(totalPages: number, currentPage: number): number {
    return totalPages - currentPage;
  }
}