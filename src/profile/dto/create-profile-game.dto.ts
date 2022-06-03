import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsUUID } from "class-validator";

export class CreateProfileGameDto {
  @IsUUID()
  @ApiProperty({
    description: "Game ID",
    example: "3b2e6023-a2ac-4e21-a76a-baa6df036a3f",
  })
  gameId: string;

  @IsBoolean()
  @ApiProperty({
    description: "Is this game a favorite one?",
    example: true,
  })
  isFavorite: boolean;
}