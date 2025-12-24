"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Control, UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Plus, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { quizApi } from "@/lib/api/main.api";
import { QuestionType } from "@/lib/types/question.type";
import { quizSchema, type CreateQuizSchema } from "@/lib/validation/quiz.schema";
import { ChoicesList } from "@/lib/components/choice-list.question";
import { TrueFalseSelector } from "@/lib/components/true-false.question";
import { error } from "console";
import { TextAnswerInput } from "@/lib/components/text-answer.question";

const EMPTY_QUESTION = { 
  text: "", 
  type: QuestionType.TEXT_ANSWER, 
  choices: [{ text: "" }] 
};


export default function CreateQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateQuizSchema>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [EMPTY_QUESTION],
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: CreateQuizSchema) => {
    setIsSubmitting(true);
    try {
      await quizApi.create(data);
      router.push("/quizzes");
      router.refresh();
    } catch (error) {
      console.error("Failed to create quiz:", error);
      alert("Error creating quiz. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto pb-20">
      
      <div className="flex items-center gap-4 mb-8">
        <Link href="/quizzes" className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold">Create New Quiz</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="card bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <label className="block text-sm font-medium mb-1">Quiz Title</label>
          <input
            {...register("title")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.title ? "border-red-500" : "border-slate-300"
            }`}
            placeholder="Enter your quiz title"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Questions</h2>
            <button
              type="button"
              onClick={() => append(EMPTY_QUESTION)}
              className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
            >
              <Plus size={16} /> Add Question
            </button>
          </div>

          {fields.map((field, index) => {
            const currentType = watch(`questions.${index}.type`);

            return (
              <div 
                key={field.id} 
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md relative overflow-hidden"
              >
              
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500" />

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                      Question Text
                    </label>
                    <input
                      {...register(`questions.${index}.text`)}
                      placeholder={`Question ${index + 1}`}
                      className={`w-full p-2.5 border rounded-lg font-medium outline-none transition-all ${
                        errors.questions?.[index]?.text 
                          ? "border-red-500 bg-red-50" 
                          : "border-slate-200 focus:border-blue-500"
                      }`}
                    />
                    {errors.questions?.[index]?.text && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.questions[index]?.text?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <div className="w-40">
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                        Type
                      </label>
                      <select
                        value={currentType}
                        onChange={(e) => {
                          const newType = e.target.value as QuestionType;
                          setValue(`questions.${index}.type`, newType);
                          if (newType === QuestionType.TEXT_ANSWER) {
                             setValue(`questions.${index}.choices`, [{ text: "" }]);
                          } else if (newType === QuestionType.TRUE_FALSE) {
                             setValue(`questions.${index}.choices`, [{ isCorrect: true }]); 
                          } else {
                             setValue(`questions.${index}.choices`, []);
                          }
                        }}
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-medium focus:border-blue-500 outline-none cursor-pointer h-10"
                      >
                        <option value={QuestionType.TEXT_ANSWER}>Text Answer</option>
                        <option value={QuestionType.TRUE_FALSE}>True / False</option>
                        <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
                      </select>
                    </div>

                    <div className="flex items-end pb-1">
                      <button 
                        type="button" 
                        onClick={() => remove(index)} 
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  
                  {currentType === QuestionType.TEXT_ANSWER && (
                    <TextAnswerInput
                      qIndex={index}
                      control={control}
                      register={register}
                      errors={errors}
                    />
                  )}

                  {currentType === QuestionType.TRUE_FALSE && (
                    <TrueFalseSelector
                      qIndex={index}
                      control={control}
                    />
                  )}

                  {currentType === QuestionType.MULTIPLE_CHOICE && (
                    <ChoicesList 
                      control={control} 
                      register={register} 
                      qIndex={index} 
                      errors={errors} 
                    />
                  )}

                </div>

              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Quiz"}
          </button>
        </div>
        {fields.length === 0 && errors.questions && errors.questions.root?.message && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-300 text-center text-sm font-bold flex flex-col items-center gap-1 animate-in fade-in slide-in-from-top-2">
            {errors.questions.root?.message}
          </div>
        )}
      </form>
    </div>
  );
}

