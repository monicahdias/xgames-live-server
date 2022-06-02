import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.game.findMany();
  }

  create(dto: CreateGameDto) {
    const data: Game = { ...dto };

    return this.prisma.game.create({ data });
  }
}
