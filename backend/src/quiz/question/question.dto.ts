import { IsString, IsNotEmpty, IsEnum, IsArray } from "class-validator";

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  TEXT_ANSWER = 'TEXT_ANSWER'
}

export interface TextChoice {
  text: string;
}

export interface TrueFalseChoice {
  isCorrect: boolean;
}

export interface MultipleChoice {
  text: string;
  isCorrect: boolean;
}

export type ChoiceData = TextChoice | TrueFalseChoice | MultipleChoice[];

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  choices: ChoiceData[];
}