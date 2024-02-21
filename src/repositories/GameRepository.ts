import { RowDataPacket } from 'mysql2';
import connection from '../db/connection'

export default class GameRepository {
  async get(page = 1, limit = 10) {
    const [ result ] = await connection.query<RowDataPacket[]>('SELECT * FROM games LIMIT ? OFFSET ?', [limit, ((page -1) * limit)])

    return result;
  }
}
