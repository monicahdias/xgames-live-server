import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    if (dto.gameId) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
            games: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { games: true, user: true },
        })
        .catch(handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  findAll() {
    return this.prisma.profile.findMany({
      include: {
        games: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.profile
      .findUnique({
        where: { id },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          games: true,
          favoriteGames: {
            select: {
              games: true,
              id: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async addOrRemoveFavoriteGame(profileId: string, gameId: string) {
    const user = await this.findOne(profileId);
    let favoriteGame = false;
    user.favoriteGames.games.map((game) => {
      if (game.id === gameId) {
        favoriteGame = true;
      }
    });
    if (favoriteGame) {
      return await this.prisma.favoriteGame.update({
        where: { id: user.favoriteGames.id },
        data: {
          games: {
            disconnect: {
              id: gameId,
            },
          },
        },
      });
    } else {
      return await this.prisma.favoriteGame.update({
        where: { profileId },
        data: {
          games: {
            connect: {
              id: gameId,
            },
          },
        },
      });
    }
  }

  async update(userId: string, id: string, dto: UpdateProfileDto) {
    const user = await this.findOne(id);

    if (dto.gameId) {
      let GameExist = false;
      user.games.map((game) => {
        if (game.id == dto.gameId) {
          GameExist = true;
        }
      });
      if (GameExist) {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              games: {
                disconnect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      } else {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              games: {
                connect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      }
    } else {
      return this.prisma.profile
        .update({
          where: { id: id },
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  async delete(userId: string, id: string) {
    await this.findOne(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
