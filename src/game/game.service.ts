import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.game.findMany();
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with ID '${id}' not found`);
    }
    return record;
  }

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  create(dto: CreateGameDto): Promise<Game> {
    const data: Game = { ...dto };

    return this.prisma.game.create({ data });
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findById(id);
    const data: Partial<Game> = { ...dto };

    return this.prisma.game.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.prisma.game.delete({ where: { id } });
  }
}
