import { Plus, Trash2 } from "lucide-react";
import { Control, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form";
import { CreateQuizSchema } from "../validation/quiz.schema";
import { useEffect } from "react";

interface ChoicesListProps {
  qIndex: number;
  control: Control<CreateQuizSchema>;
  register: UseFormRegister<CreateQuizSchema>;
  errors: FieldErrors<CreateQuizSchema>;
}

export function ChoicesList({ control, register, qIndex, errors }: ChoicesListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${qIndex}.choices`,
  });
  useEffect(()=> {
    console.log(errors.questions?.[qIndex])
  })

  return (
    <div className="mt-4 pl-4 border-l-2 border-slate-200 space-y-3">
      <p className="text-xs font-bold text-slate-500 uppercase">Answer Options</p>
      
      {fields.map((item, cIndex) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register(`questions.${qIndex}.choices.${cIndex}.isCorrect`)}
            className="w-5 h-5 cursor-pointer accent-blue-600"
          />
          
          <input
            {...register(`questions.${qIndex}.choices.${cIndex}.text`)}
            placeholder={`Option ${cIndex + 1}`}
            className={`flex-1 p-2 border rounded text-sm ${
               errors.questions?.[qIndex]?.choices?.[cIndex]?.text ? "border-red-500" : "border-slate-300"
            }`}
          />
          
          <button type="button" onClick={() => remove(cIndex)}>
            <Trash2 size={16} className="text-slate-400 hover:text-red-500" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ text: "", isCorrect: false })}
        className="flex items-center gap-1 text-sm text-blue-600 font-bold hover:underline"
      >
        <Plus size={14} /> Add Option
      </button>
      
      
      {errors.questions?.[qIndex]?.choices && ( <>
        <p className="text-red-500 text-xs">{errors.questions[qIndex]?.root?.message}</p>
        <p className="text-red-500 text-xs">{errors.questions[qIndex]?.choices?.root?.message}</p>
        </>
      )}
    </div>
  );
}