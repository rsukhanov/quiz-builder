import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEnum, IsArray, ValidateNested } from "class-validator";
import { CreateChoiceDto } from "./choice/choice.dto";

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  TEXT_ANSWER = 'TEXT_ANSWER'
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChoiceDto)
  choices: CreateChoiceDto[];
}