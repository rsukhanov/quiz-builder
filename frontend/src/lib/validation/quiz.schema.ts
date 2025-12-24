import { z } from "zod";
import { QuestionType } from "@/lib/types/question.type";


const choiceSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty').or(z.literal("")).optional(), 
  isCorrect: z.boolean().optional(),
});


const questionSchema = z.object({
  text: z.string().min(3, 'Question text should be at least 3 characters'),
  type: z.enum(QuestionType),
  choices: z.array(choiceSchema),
}).superRefine((data, ctx) => {
  
  if (data.type === QuestionType.TEXT_ANSWER) {
    const answer = data.choices[0];
    if (!answer?.text || answer.text.trim() === "") {
      ctx.addIssue({
        code: "custom",
        message: "Enter the expected text answer",
        path: ["choices", 0, "text"], 
      });
    }
  }

  if (data.type === QuestionType.TRUE_FALSE) {
    const answer = data.choices[0];
    if (answer?.isCorrect === undefined) {
      ctx.addIssue({
        code: "custom",
        message: "Select True or False",
        path: ["choices", 0, "isCorrect"],
      });
    }
  }

  if (data.type === QuestionType.MULTIPLE_CHOICE) {
    if (data.choices.length < 2) {
      ctx.addIssue({
        code: "custom",
        message: "Add at least 2 options",
        path: ["choices"], 
      });
    }

    data.choices.forEach((choice, index) => {
      if (!choice.text || choice.text.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Option text cannot be empty",
          path: ["choices", index, "text"], 
        });
      }
    });

    const hasCorrect = data.choices.some((c) => c.isCorrect === true);
    if (!hasCorrect) {
      ctx.addIssue({
        code: "custom",
        message: "Select at least one correct answer",
        path: ["choices"],
      });
    }
  }
});


export const quizSchema = z.object({
  title: z.string().nonempty("Title is required").min(3, "Title is too short"),
  questions: z.array(questionSchema).min(1, "Add at least one question"),
});


export type CreateQuizSchema = z.infer<typeof quizSchema>;