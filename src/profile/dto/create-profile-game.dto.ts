import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateProfileGameDto {
  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'Game ID',
    example: '3b2e6023-a2ac-4e21-a76a-baa6df036a3f',
  })
  gameId: string;
}
