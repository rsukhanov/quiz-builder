import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './quiz.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  @Get(':id')
  getQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.getQuizById(id);
  }

  @Post()
  createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Delete(':id')
  deleteQuiz(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.deleteQuiz(id);
  }
}