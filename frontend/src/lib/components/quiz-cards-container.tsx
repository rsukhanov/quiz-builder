"use client";

import { useState } from "react";
import { quizApi } from "@/lib/api/main.api";
import type { Quiz } from "@/lib/types/quiz.type";
import { SmallQuizCard } from "@/lib/components/small-quiz.card";

interface QuizGridProps {
  initialQuizzes: Quiz[];
}

export function QuizCardContainer({ initialQuizzes }: QuizGridProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you really sure you want to delete this quiz?")) return;

    setIsDeleting(id);
    try {
      await quizApi.delete(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      alert("Failed to delete quiz");
      console.error(err);
    } finally {
      setIsDeleting(null);
    }
  };

  if (quizzes.length === 0) {
    return <div className="text-center text-slate-400 py-10">No quizzes left.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <SmallQuizCard
          key={quiz.id}
          quiz={quiz}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}