"use client";

import Link from "next/link"; 
import { Layers, Loader2, Trash2 } from "lucide-react";
import { Quiz } from "../types/quiz.type";

interface SmallQuizCardProps {
  quiz: Quiz;
  handleDelete: (id: number, e: React.MouseEvent) => void;
  isDeleting: number | null;
}

export function SmallQuizCard({ quiz, handleDelete, isDeleting }: SmallQuizCardProps) {
  return (
    <Link
      href={`/quizzes/${quiz.id}`}
      className="card group relative flex flex-col justify-between p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors pr-8">
            {quiz.title}
          </h3>
        </div>
        <p className="text-slate-400 text-xs font-mono">
          Created at: {new Date(quiz.createdAt).toLocaleString('en-GB', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          <Layers size={14} />
          <span>{quiz.questions?.length || 0} Questions</span>
        </div>
        
        <button
          onClick={(e) => handleDelete(quiz.id, e)}
          disabled={isDeleting === quiz.id}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 z-10"
        >
          {isDeleting === quiz.id ? (
            <Loader2 className="animate-spin w-5 h-5"/>
          ) : (
            <Trash2 size={20} />
          )}
        </button>
      </div>
    </Link>
  );
}