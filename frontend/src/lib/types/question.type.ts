import { ChoiceData } from "./choice.type";

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  TEXT_ANSWER = "TEXT_ANSWER",
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  quizId: number;
  choices: ChoiceData[];
}
