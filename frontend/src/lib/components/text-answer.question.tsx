import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateQuizSchema } from "@/lib/validation/quiz.schema";

interface Props {
  control: Control<CreateQuizSchema>;
  qIndex: number;
  register: UseFormRegister<CreateQuizSchema>;
  errors: FieldErrors<CreateQuizSchema>;
}

export function TextAnswerInput({ qIndex, register, errors }: Props) {
  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs font-bold text-slate-500 uppercase">Expected Answer</p>
      <input
        {...register(`questions.${qIndex}.choices.0.text`)}
        type="text"
        placeholder="Enter answer text"
        className="w-full p-3 bg-slate-50 text-slate-700 text-sm rounded border border-slate-200 outline-none focus:border-blue-400"
      />
      {errors.questions?.[qIndex]?.choices?.[0]?.text && (
        <p className="text-red-500 text-xs">{errors.questions[qIndex]?.choices?.[0]?.text?.message}</p>
      )}
    </div>
  );
}