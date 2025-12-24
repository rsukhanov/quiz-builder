import { Question } from "./question.type";

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  createdAt: string;
}
