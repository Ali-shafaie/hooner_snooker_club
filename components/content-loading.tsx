import { Loader } from "lucide-react";

interface ContentLoadingProps {
  className?: string;
}

function ContentLoading({ className }: ContentLoadingProps) {
  return (
    <div
      dir="rtl"
      className={`flex min-h-[350px] flex-col items-center justify-center border-none rounded-md border p-8 text-center animate-in fade-in-50 ${className}`}
    >
      <div className="flex flex-row items-center gap-2">
        <Loader className="h-4 w-4 animate-spin" />
        <p className="text-sm">Loading results ...</p>
      </div>
    </div>
  );
}

export default ContentLoading;
