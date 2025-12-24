import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
    </div>
  );
}