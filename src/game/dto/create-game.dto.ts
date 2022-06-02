import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the game',
    example: 'Valheim',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'The URL of cover image of the game',
    example:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the game',
    example: 'A game about the great Valheim',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The year of the game',
    example: 2020,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The IMDB score of the game',
    example: 5,
  })
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'The URL of the game trailer',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  trailerYouTubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'The URL of the game gameplay',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  gameplayYouTubeUrl: string;
}
