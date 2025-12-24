import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../general/prisma/prisma.service';
import { CreateQuestionDto } from './question.dto';
import { ChoiceService } from './choice/choice.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly choiceService: ChoiceService,
  ) {}

  async create(quizId: number, question: CreateQuestionDto) {
    const createdQuestion = await this.prisma.question.create({
      data: {
        text: question.text,
        type: question.type,
        quizId,
      },
    });

    if (question.choices && question.choices.length > 0) {
      await this.choiceService.createMany(createdQuestion.id, question.choices);
    }

    return createdQuestion;
  }

  async findByQuizId(quizId: number) {
    return this.prisma.question.findMany({
      where: { quizId },
      include: {
        choices: true,
      },
    });
  }
}