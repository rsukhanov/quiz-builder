import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/general/prisma/prisma.service';
import { CreateQuizDto } from './quiz.dto';
import { QuestionService } from './question/question.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly questionService: QuestionService,
  ) {}

  async getAllQuizzes() {
    return await this.prismaService.quiz.findMany({
      include: {
        questions: {
          include: {
            choices: true,
          },
        },
      },
    });
  }

  async getQuizById(id: number) {
    return await this.prismaService.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            choices: true,
          },
        },
      },
    });
  }

  async deleteQuiz(id: number) {
    return await this.prismaService.quiz.delete({
      where: { id },
    });
  }

  async createQuiz(data: CreateQuizDto) {
    const quiz = await this.prismaService.quiz.create({
      data: {
        title: data.title,
      },
    });

    for (const question of data.questions) {
      await this.questionService.create(quiz.id, question);
    }

    return this.getQuizById(quiz.id);
  }
}