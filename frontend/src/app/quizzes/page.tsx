"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Loader2, HelpCircle } from "lucide-react";
import { quizApi } from "@/lib/api/main.api";
import type { Quiz } from "@/lib/types/quiz.type";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null); 

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizApi.getAll();
        setQuizzes(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load quizzes. Check if backend is running.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl font-bold mb-2">Error</div>
        <p className="text-slate-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your quizzes</p>
        </div>
        
        <Link href="/create" className="btn gap-2 shadow-lg shadow-blue-500/20">
          <Plus size={20} />
          Create New Quiz
        </Link>
      </div>

      {!quizzes || quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 text-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <HelpCircle size={48} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No quizzes yet</h3>
          <p className="text-slate-500 mb-6 max-w-sm">
            Create your first quiz to start testing users.
          </p>
          <Link href="/create" className="btn btn-outline">
            Create Quiz
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quizzes/${quiz.id}`}
              className="card group relative flex flex-col justify-between min-h-[160px] hover:border-blue-400 hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors pr-8">
                    {quiz.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-xs font-mono">ID: {quiz.id}</p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  <HelpCircle size={14} />
                  <span>{quiz.questions?.length || 0} Questions</span>
                </div>
                
                <button
                  onClick={(e) => handleDelete(quiz.id, e)}
                  disabled={isDeleting === quiz.id}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                >
                  {isDeleting === quiz.id ? (
                    <Loader2 className="animate-spin w-5 h-5"/>
                  ) : (
                    <Trash2 size={20} />
                  )}
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}