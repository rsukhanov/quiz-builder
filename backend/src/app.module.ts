import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuizModule } from './quiz/quiz.module';
import { PrismaModule } from './general/prisma/prisma.module';

@Module({
  imports: [QuizModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
