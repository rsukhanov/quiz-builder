import { QuestionType } from "@/lib/types/question.type";
import { Check, X } from "lucide-react";
import { ChoiceData } from "../types/choice.type";



interface Question {
  id: number;
  text: string;
  type: QuestionType | string; 
  choices: ChoiceData[];
}

export function ReadOnlyQuestion({ question, index }: { question: Question; index: number }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-slate-800">
          {index + 1}. {question.text}
        </h3>
        <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase">
          {question.type.replace("_", " ")}
        </span>
      </div>

      <div className="pl-4 border-l-2 border-slate-100 space-y-3">
        {question.type === QuestionType.TEXT_ANSWER && (
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Correct Answer:</p>
            <div className="p-3 bg-green-50 text-green-800 font-medium rounded-lg border border-green-200">
              {question.choices[0]?.text || "—"}
            </div>
          </div>
        )}

        {question.type === QuestionType.TRUE_FALSE && (
          <div className="flex gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold ${
                question.choices[0]?.isCorrect === true
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-slate-200 text-slate-400 opacity-50"
              }`}
            >
              True
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold ${
                question.choices[0]?.isCorrect === false
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-slate-200 text-slate-400 opacity-50"
              }`}
            >
              False
            </div>
          </div>
        )}

        {question.type === QuestionType.MULTIPLE_CHOICE && (
          <div className="space-y-2">
            {question.choices.map((choice, choiceIndex) => (
              <div
                key={`${index}-${choiceIndex}`}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  choice.isCorrect
                    ? "bg-green-50 border-green-200 text-green-900"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border ${
                    choice.isCorrect
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {choice.isCorrect && <Check size={14} strokeWidth={3} />}
                </div>
                <span className="font-medium">{choice.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}