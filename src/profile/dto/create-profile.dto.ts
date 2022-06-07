import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'User ID',
    example: '751d3728-5b0d-4aac-ab79-e263144908a0',
  })
  userId: string;

  @IsString()
  @ApiProperty({
    description: 'Profile name',
    example: 'Monica',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Profile image URL',
    example: 'https://i.imgur.com/w3duR07.jpg',
  })
  imageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Game ID',
    example: '9f4afb02-8108-404e-858b-f1a25ac2aa91',
  })
  gameId?: string;

  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'Favorite game ID',
    example: '9f4afb02-8108-404e-858b-f1a25ac2aa91',
  })
  favoriteGameId?: string;
}
