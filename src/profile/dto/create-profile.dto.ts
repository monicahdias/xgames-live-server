import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'User ID',
    example: 'c461e9e4-f6b4-4ca4-b4e0-b38e03d6bad4',
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

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Profile games',
    example: [
      '3b2e6023-a2ac-4e21-a76a-baa6df036a3f',
      '4e780afd-5568-478c-b553-a9b38b63ddb8',
    ],
  })
  games: string[];
}
