import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';

@Injectable()
export class CurriculumService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCurriculumDto) {
    // 1. Guardamos el CV
    await this.prisma.curriculum.create({
      data: {
        title: dto.title ?? null,
        data: dto.data,
      },
    });

    // 2. Contar cuántos existen
    const count = await this.prisma.curriculum.count();

    // 3. Si hay más de 10, borrar los más antiguos
    if (count > 10) {
      const toDelete = count - 10;

      await this.prisma.curriculum.deleteMany({
        where: {},
        orderBy: { createdAt: 'asc' },
        take: toDelete,
      });
    }

    return { message: 'Curriculum guardado correctamente' };
  }

  async findLastTen() {
    return this.prisma.curriculum.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}
