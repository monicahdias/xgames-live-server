import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.game.findMany({
      include: {
        genres: true,
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.game.findUnique({
      where: { id },
      include: {
        genres: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Record with ID '${id}' not found`);
    }
    return record;
  }

  async create(dto: CreateGameDto, user: User) {
    if (user.isAdmin) {
      const data: Prisma.GameCreateInput = {
        title: dto.title,
        description: dto.description,
        coverImageUrl: dto.coverImageUrl,
        year: dto.year,
        imdbScore: dto.imdbScore,
        trailerYouTubeUrl: dto.trailerYouTubeUrl,
        gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
        genres: {
          connect: {
            name: dto.genreName,
          },
        },
      };

      return await this.prisma.game
        .create({
          data,
          include: {
            genres: true,
          },
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async update(id: string, dto: UpdateGameDto, user: User) {
    if (user.isAdmin) {
      const gameAtual = await this.findById(id);
      const data: Prisma.GameUpdateInput = {
        title: dto.title,
        description: dto.description,
        coverImageUrl: dto.coverImageUrl,
        year: dto.year,
        imdbScore: dto.imdbScore,
        trailerYouTubeUrl: dto.trailerYouTubeUrl,
        gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
        genres: {
          disconnect: {
            name: gameAtual.genres[0].name,
          },
          connect: {
            name: dto.genreName,
          },
        },
      };
      return await this.prisma.game
        .update({
          where: { id },
          data,
          include: {
            genres: true,
          },
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);
      await this.prisma.game.delete({ where: { id } });
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }
}
