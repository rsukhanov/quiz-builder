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
    .get(`${QUIZ_ENDPOINT}/${id}`),

  create: (data: CreateQuizSchema): Promise<Quiz> => api
    .post(QUIZ_ENDPOINT, data),

  delete: (id: number): Promise<void> => api
    .delete(`${QUIZ_ENDPOINT}/${id}`),
};