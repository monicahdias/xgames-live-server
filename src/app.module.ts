import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [GameModule, PrismaModule, GenreModule, UserModule, ProfileModule, AuthModule, HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
