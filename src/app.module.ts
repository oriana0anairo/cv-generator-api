import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CurriculumModule } from './curriculum/curriculum.module';

@Module({
  imports: [PrismaModule, CurriculumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
