import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Layers } from "lucide-react";
import { quizApi } from "@/lib/api/main.api";
import { ReadOnlyQuestion } from "@/lib/components/read-question.question";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function QuizDetailPage({ params }: PageProps) {
  let quiz;

  try {
    quiz = await quizApi.getById(Number(params.id));
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return notFound(); 
  }

  return (
    <div className="max-w-3xl mx-auto pb-20 pt-10 px-4">
      <div className="mb-8">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-4 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Back to Quizzes
        </Link>
        
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{quiz.title}</h1>
                <div className="flex gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(quiz.createdAt).toLocaleString("en-GB", {
                            dateStyle: "short",
                            timeStyle: "short",
                        })}
                    </span>
                    <span className="flex items-center gap-1">
                        <Layers size={12} />
                        {quiz.questions.length} Questions
                    </span>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 border-dashed text-slate-400">
            No questions in this quiz yet.
          </div>
        ) : (
          quiz.questions.map((question: any, index: number) => (
            <ReadOnlyQuestion 
                key={question.id} 
                question={question} 
                index={index} 
            />
          ))
        )}
      </div>
    </div>
  );
}

