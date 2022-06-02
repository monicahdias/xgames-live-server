import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with ID '${id}' not found`);
    }
    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.user.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }
  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'An error occurred while processing your request',
    );
  }
}
