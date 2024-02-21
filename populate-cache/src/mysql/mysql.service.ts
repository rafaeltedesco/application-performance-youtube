import * as mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MySqlService {
  constructor(private readonly configService: ConfigService) {}
  async countGames(): Promise<RowDataPacket[]> {
    const connection = await mysql.createConnection({
      host: this.configService.get('DB_HOST'),
      user: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
    });
    const [[{ total }]] = await connection.execute<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM games',
    );
    return total;
  }
}
