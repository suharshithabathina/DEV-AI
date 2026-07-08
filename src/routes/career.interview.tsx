import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Send, Terminal, ShieldAlert, Cpu } from "lucide-react";

export const Route = createFileRoute("/career/interview")({ component: InterviewPage });

interface LogMsg {
  role: "interviewer" | "candidate";
  text: string;
}

function InterviewPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<LogMsg[]>([
    { role: "interviewer", text: "Welcome! Let's start the System Design interview round.\n\nQuestion: How would you design a scalable message queue processor that handles spikes of up to 10k requests per second? What parameters are key?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const msg = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "candidate", text: msg }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "interviewer", text: "Excellent point on queue sizing and caching! How would you distribute load variables across worker clusters to prevent bottleneck overflows?" }
      ]);
      toast.success("Feedback generated! Score +15 points.");
    }, 1200);
  };

  return (
    <Screen title="AI Practice Simulator" contentClass="flex flex-col h-[calc(100vh-120px)] px-5 pb-4">
      {/* Scrollable messages log */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-4 hide-scrollbar">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 animate-slide-in ${
              m.role === "candidate" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                m.role === "candidate" ? "bg-primary text-white" : "bg-primary-soft text-primary"
              }`}
            >
              {m.role === "candidate" ? "ME" : "AI"}
            </div>
            <div
              className={`rounded-2xl px-4 py-3 text-xs max-w-[80%] whitespace-pre-wrap leading-relaxed shadow-soft ${
                m.role === "candidate"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-card text-foreground rounded-tl-none border border-border/40"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input panel form */}
      <form onSubmit={handleSend} className="flex gap-2 items-center bg-card border border-border p-1.5 rounded-2xl shadow-soft select-none">
        <input
          type="text"
          placeholder="Type your design answers..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2 text-xs outline-none text-foreground"
        />
        <button type="submit" className="h-9 w-9 flex items-center justify-center bg-primary text-white rounded-xl hover:brightness-105 transition cursor-pointer">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </Screen>
  );
}
