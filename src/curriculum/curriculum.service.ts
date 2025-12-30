import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';

@Injectable()
export class CurriculumService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCurriculumDto) {
    // 1. Guardar el nuevo CV
    await this.prisma.curriculum.create({
      data: {
        title: dto.title ?? null,
        data: dto.data,
      },
    });

    // 2. Contar cuántos hay
    const count = await this.prisma.curriculum.count();

    // 3. Si hay más de 10 → borrar los más viejos
    if (count > 10) {
      const toDelete = count - 10;

      // Obtener los más antiguos
      const oldOnes = await this.prisma.curriculum.findMany({
        orderBy: { createdAt: 'asc' },
        take: toDelete,
        select: { id: true },
      });

      // Borrarlos por ID
      await this.prisma.curriculum.deleteMany({
        where: { id: { in: oldOnes.map((c) => c.id) } },
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

  async findOneById(id: string) {
    return this.prisma.curriculum.findUnique({
      where: { id },
    });
  }
}
