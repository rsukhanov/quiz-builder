import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../general/prisma/prisma.service';
import { CreateQuestionDto } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(quizId: number, question: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        text: question.text,
        type: question.type,
        choicesJSON: JSON.stringify(question.choices),
        quizId,
      },
    });
  }

  async findByQuizId(quizId: number) {
    return this.prisma.question.findMany({
      where: { quizId },
    });
  }

  async findOne(id: number) {
    return this.prisma.question.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}