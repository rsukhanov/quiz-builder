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

