import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ChoiceModule } from './choice/choice.module';
import { PrismaModule } from 'src/general/prisma/prisma.module';

@Module({
  providers: [QuestionService],
  imports: [ChoiceModule, PrismaModule],
  exports: [QuestionService],
})
export class QuestionModule {}
