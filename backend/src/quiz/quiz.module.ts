import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaModule } from 'src/general/prisma/prisma.module';
import { QuestionModule } from './question/question.module';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [PrismaModule, QuestionModule],
})
export class QuizModule {}
