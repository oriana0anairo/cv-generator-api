import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';

@Controller('curriculums')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  create(@Body() dto: CreateCurriculumDto) {
    return this.curriculumService.create(dto);
  }

  @Get()
  findAll() {
    return this.curriculumService.findLastTen();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.findOneById(id);
  }
}
