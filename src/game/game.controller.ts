import { Controller, Get, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
  @Get()
  findAll() {
    return 'Find all games';
  }

  @Post()
  create() {
    return 'Create a new game';
  }
}
