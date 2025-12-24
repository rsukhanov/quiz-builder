import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../general/prisma/prisma.service';
import { CreateChoiceDto } from './choice.dto';

@Injectable()
export class ChoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(questionId: number, choices: CreateChoiceDto[]) {
    return this.prisma.choice.createMany({
      data: choices.map(choice => ({
        text: choice.text,
        isCorrect: choice.isCorrect,
        questionId,
      })),
    });
  }

  async findByQuestionId(questionId: number) {
    return this.prisma.choice.findMany({
      where: { questionId },
    });
  }
}