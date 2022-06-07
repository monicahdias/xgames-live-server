import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from '@prisma/client';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new profile',
  })
  create(@LoggedUser() user: User, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(user.id, createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all profiles',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a profile by ID',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a profile by ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(user.id, id, updateProfileDto);
  }

  @Patch('favoriteGame/:id')
  @ApiOperation({
    summary: 'Add a favorite game to a profile',
  })
  updateFavorite(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.addOrRemoveFavoriteGame(
      id,
      updateProfileDto.favoriteGameId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a profile by ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.profileService.delete(user.id, id);
  }
}
