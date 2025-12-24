import axios from "axios";
import { Quiz } from "../types/quiz.type";
import { CreateQuizSchema } from "../validation/quiz.schema";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const QUIZ_ENDPOINT = "/quizzes";

export const quizApi = {
  getAll: (): Promise<Quiz[]> => api
    .get(QUIZ_ENDPOINT),

  getById: (id: number): Promise<Quiz> => api
    .get(`${QUIZ_ENDPOINT}/${id}`)
    .then((data: any) => {
      const quiz: any = data;
      if (quiz && Array.isArray(quiz.questions)) {
        quiz.questions = quiz.questions.map((q: any) => {
          try {
            return {
              ...q,
              choices: JSON.parse(q.choices)
            };
          } catch (e) {
            console.error("JSON Parse error for question:", q.id, e);
            return { ...q, choices: [] };
          }
          return q;
        });
      }

        return quiz as Quiz;
    }),

  create: (data: CreateQuizSchema): Promise<Quiz> => api
    .post(QUIZ_ENDPOINT, data),

  delete: (id: number): Promise<void> => api
    .delete(`${QUIZ_ENDPOINT}/${id}`),
};