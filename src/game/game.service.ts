import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  findAll() {
    return 'Find all games';
  }

  create() {
    return 'Create a new game';
  }
}
