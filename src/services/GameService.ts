import GameRepository from '../repositories/GameRepository';
import { ServiceStatus } from './ServiceStatus';

export default class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async getPaginated(page = 1, limit = 10) {
    const games = await this.gameRepository.get(page, limit);
    return {
      status: ServiceStatus.OK,
      data: games,
      page,
      limit,
    }
  }
}