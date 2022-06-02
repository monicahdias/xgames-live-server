import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GameModule, PrismaModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
