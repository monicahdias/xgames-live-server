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
        connect: createProfileDto.games.map((gameId) => ({
          id: gameId,
        })),
      },
    };

    return this.prisma.profile
      .create({
        data,
        select: {
          id: true,
          title: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          games: {
            select: {
              title: true,
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
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        games: {
          select: {
            title: true,
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
            email: true,
          },
        },
        games: {
          select: {
            id: true,
            title: true,
            coverImageUrl: true,
            description: true,
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

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
