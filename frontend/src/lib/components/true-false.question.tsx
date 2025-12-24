import { Control, Controller } from "react-hook-form";
import { CreateQuizSchema } from "@/lib/validation/quiz.schema";

interface Props {
  control: Control<CreateQuizSchema>;
  qIndex: number;
}

export function TrueFalseSelector({ control, qIndex }: Props) {
  return (
    <div className="mt-4">
      <p className="text-xs font-bold text-slate-500 uppercase mb-2">Correct Answer</p>
      <Controller
        control={control}
        name={`questions.${qIndex}.choices.0.isCorrect`}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-8 pl-1">
              <button
                type="button"
                onClick={() => field.onChange(true)}
                className="flex flex-col items-center gap-2 group outline-none"
              >
                <div className={`w-6 h-6 rounded-full border-2 transition-all ${
                  field.value === true ? "bg-green-500 border-green-500" : "bg-white border-slate-300"
                }`} />
                <span className={`text-sm font-bold ${field.value === true ? "text-green-600" : "text-slate-400"}`}>
                  True
                </span>
              </button>

              <button
                type="button"
                onClick={() => field.onChange(false)}
                className="flex flex-col items-center gap-2 group outline-none"
              >
                <div className={`w-6 h-6 rounded-full border-2 transition-all ${
                  field.value === false ? "bg-red-500 border-red-500" : "bg-white border-slate-300"
                }`} />
                <span className={`text-sm font-bold ${field.value === false ? "text-red-600" : "text-slate-400"}`}>
                  False
                </span>
              </button>
            </div>
            
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-2">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}