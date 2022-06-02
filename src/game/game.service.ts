import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  findAll() {
    return 'Find all games';
  }

  create(createGameDto: CreateGameDto) {
    return 'Create a new game' + JSON.stringify(createGameDto);
  }
}
