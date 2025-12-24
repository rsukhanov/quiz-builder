import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateChoiceDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}
