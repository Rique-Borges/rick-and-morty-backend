import { IsInt, IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateCharacterDto {
  @IsInt()
  original_character_id: number;

  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  gender: string;

  @IsString()
  origin: string;

  @IsString()
  location: string;

  @IsUrl()
  image: string;

  @IsString()
  status: string;

  // created_at / updated_at ficam por conta do Prisma (default/updatedAt)
}
