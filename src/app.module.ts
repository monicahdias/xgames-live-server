import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [GameModule, PrismaModule, GenreModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
