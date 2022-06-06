import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileDto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      user: {
        connect: {
          id: createProfileDto.userId,
        },
      },
      title: createProfileDto.title,
      imageUrl: createProfileDto.imageUrl,
      games: {
        createMany: {
          data: createProfileDto.games.map((createProfileGameDto) => ({
            gameId: createProfileGameDto.gameId,
            isFavorite: createProfileGameDto.isFavorite,
          })),
        },
      },
    };

    return this.prisma.profile
      .create({
        data,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          user: {
            select: {
              name: true,
            },
          },
          games: {
            select: {
              game: {
                select: {
                  title: true,
                },
              },
              isFavorite: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  findAll() {
    return this.prisma.profile.findMany({
      select: {
        id: true,
        title: true,
        games: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            games: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        games: {
          select: {
            game: {
              select: {
                title: true,
              },
            },
            isFavorite: true,
          },
        },
      },
    });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const data: Prisma.ProfileUpdateInput = {
      user: {
        connect: {
          id: updateProfileDto.userId,
        },
      },
      title: updateProfileDto.title,
      imageUrl: updateProfileDto.imageUrl,
      games: {
        createMany: {
          data: updateProfileDto.games.map((updateProfileGameDto) => ({
            gameId: updateProfileGameDto.gameId,
            isFavorite: updateProfileGameDto.isFavorite,
          })),
        },
      },
    };

    return this.prisma.profile
      .update({
        where: { id },
        data,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          user: {
            select: {
              name: true,
            },
          },
          games: {
            select: {
              game: {
                select: {
                  title: true,
                },
              },
              isFavorite: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  delete(id: string) {
    this.prisma.profile.delete({ where: { id } });
  }
}
