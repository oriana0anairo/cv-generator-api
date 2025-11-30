import { IsOptional, IsString, IsObject } from 'class-validator';

export class CreateCurriculumDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsObject()
  data: Record<string, any>;
}
