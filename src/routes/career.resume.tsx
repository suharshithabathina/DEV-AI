import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { FileText, Sparkles, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/career/resume")({ component: ResumePage });

function ResumePage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Resume optimized! ATS score raised from 65 to 90.");
      navigate({ to: "/career/skills" });
    }, 1100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Standard text reader for demo file uploads
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      setText(fileContent || "");
      toast.success(`Loaded file: ${file.name}`);
    };
    reader.onerror = () => {
      toast.error("Failed to read the file");
    };

    if (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      reader.readAsText(file);
    } else {
      // Mock loading PDF or binary docs for clean UI prototype experience
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setText(`[Parsed Resume Details from ${file.name}]\n\nSenior Software Engineer with expertise in TypeScript, React, Node.js, and Cloud architectures. Proven track record of optimizing application performance and scaling workflows.`);
        toast.success(`Successfully uploaded and scanned ${file.name}`);
      }, 1000);
    }
  };

  return (
    <Screen title="Resume Optimizer">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <div className="space-y-4">
          <div className="bg-gradient-soft p-4 border border-primary/10 rounded-2xl select-none">
            <h2 className="text-xs font-bold text-foreground">ATS Score Optimizer</h2>
            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
              Upload a resume document or paste details below. DevAI will analyze missing keywords for target engineering roles.
            </p>
          </div>

          <form onSubmit={handleOptimize} className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 min-h-[220px] rounded-2xl bg-card border border-border/10 overflow-hidden flex flex-col shadow-soft">
              <div className="bg-muted/30 px-4 py-2 border-b border-border/10 flex items-center justify-between text-[10px] font-bold text-muted-foreground select-none">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3 w-3 text-primary" /> resume.txt
                </span>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 hover:text-foreground transition cursor-pointer bg-transparent border-none outline-none"
                >
                  <UploadCloud className="h-3 w-3" /> Upload File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.pdf,.doc,.docx,.md"
                  className="hidden"
                />
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste resume content here, or select Upload File to read document details..."
                className="flex-1 w-full p-4 text-[10px] font-mono outline-none resize-none bg-transparent text-foreground leading-relaxed"
                disabled={loading}
              />
            </div>

            <div className="pt-2 select-none">
              <GradientButton type="submit" disabled={loading || !text.trim()}>
                {loading ? "Optimizing keywords..." : "Optimize Resume"}
              </GradientButton>
            </div>
          </form>
        </div>
      </div>
    </Screen>
  );
}

