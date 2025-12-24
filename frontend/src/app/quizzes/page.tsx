import Link from "next/link";
import { Plus, HelpCircle } from "lucide-react";
import { quizApi } from "@/lib/api/main.api";
import { Quiz } from "@/lib/types/quiz.type";
import { QuizCardContainer } from "@/lib/components/quiz-cards-container";

export default async function QuizzesPage() {
  let quizzes: Quiz[] = [];

  try {
    quizzes = await quizApi.getAll();
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your quizzes</p>
        </div>
        
        <Link href="/create" className="btn gap-2 shadow-lg shadow-blue-500/20 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
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
          <Link href="/create" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Create Quiz
          </Link>
        </div>
      ) : (
        <QuizCardContainer initialQuizzes={quizzes} />
      )}
    </div>
  );
}