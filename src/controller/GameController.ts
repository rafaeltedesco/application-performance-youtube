import { Request, Response } from 'express';
import GameService from '../services/GameService';
import { HttpStatus } from './HttpStatus';

export default class GameController {
  constructor(private readonly gameService: GameService) {}

  async get(req: Request, res: Response) {
    const { page = '1', limit = '10' } = req.query;
    const { status, ...rest } = await this.gameService.getPaginated(+page, +limit);
    return res.status(HttpStatus[status]).json(rest);
  }
}