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
    };

    return this.prisma.profile.create({ data }).catch(handleError);
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} profile`;
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
