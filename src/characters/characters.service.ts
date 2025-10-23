import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

 async listMine(user_id: number) {
  return this.prisma.character.findMany({
    where: { user_id }, // ← ESSENCIAL
    orderBy: { created_at: 'desc' },
  });
}


  async getOneLocal(id: number, user_id: number) {
    const ch = await this.prisma.character.findFirst({
      where: { id, user_id },
    });
    if (!ch) throw new NotFoundException('Character not found');
    return ch;
  }

  async create(dto: CreateCharacterDto, user_id: number) {
    const exists = await this.prisma.character.findFirst({
      where: {
        original_character_id: dto.original_character_id,
        user_id,
      },
    });
    if (exists) {
      throw new ConflictException('Character already saved by this user');
    }
    return this.prisma.character.create({
      data: { ...dto, user_id },
    });
  }

  async update(id: number, dto: UpdateCharacterDto, user_id: number) {
    await this.getOneLocal(id, user_id);
    return this.prisma.character.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: number, user_id: number) {
    await this.getOneLocal(id, user_id);
    await this.prisma.character.delete({ where: { id } });
    return { deleted: true };
  }

  async countersForHome(user_id: number) {
    const savedCount = await this.prisma.character.count({ where: { user_id } });
    const last3Saved = await this.prisma.character.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
      take: 3,
      select: {
        id: true, name: true, image: true, species: true, status: true,
        origin: true, location: true, original_character_id: true,
      },
    });
    return { savedCount, last3Saved };
  }
}
