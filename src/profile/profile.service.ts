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
          data: [
            {
              gameId: createProfileDto.games[0],
              isFavorite: true,
            },
          ],
        },
      },
    };

    // createProfileDto.games.map((gameId) => ({
    //   id: gameId,
    // })),

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
          games: true,
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
        games: true,
        _count: {
          select: {
            games: true,
          },
        },
      },
    });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile
      .update({
        where: { id },
        data: {
          title: updateProfileDto.title,
          imageUrl: updateProfileDto.imageUrl,
          games: {
            connect: updateProfileDto.games.map((gameId) => ({
              id: gameId,
            })),
          },
        },
      })
      .catch(handleError);
  }

  delete(id: string) {
    this.prisma.profile.delete({ where: { id } });
  }
}
