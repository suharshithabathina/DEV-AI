import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface ScreenHeaderProps {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  transparent?: boolean;
}

export function ScreenHeader({ title, back = true, right, transparent }: ScreenHeaderProps) {
  const router = useRouter();
  return (
    <div
      className={`flex items-center justify-between px-5 py-3 select-none ${
        transparent ? "" : "bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-border/20"
      }`}
    >
      <div className="w-10">
        {back && (
          <button
            onClick={() => router.history.back()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/65 hover:bg-muted text-foreground transition active:scale-95 cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
        )}
      </div>
      {title && (
        <h1 className="text-[15px] font-bold tracking-tight text-foreground text-center flex-1 truncate mx-2">
          {title}
        </h1>
      )}
      <div className="flex w-10 items-center justify-end">{right}</div>
    </div>
  );
}
