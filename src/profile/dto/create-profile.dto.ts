import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { CreateProfileGameDto } from './create-profile-game.dto';

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

  @ValidateNested({ each: true })
  @Type(() => CreateProfileGameDto)
  @ApiProperty({
    description: 'Profile games',
    type: [CreateProfileGameDto],
  })
  games: CreateProfileGameDto[];
}
