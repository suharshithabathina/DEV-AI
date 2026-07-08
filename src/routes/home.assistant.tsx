import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, HelpCircle, ArrowRight } from "lucide-react";
import { Screen } from "@/components/mobile/Screen";
import { toast } from "sonner";
import { getApiUrl } from "@/utils/api";

export const Route = createFileRoute("/home/assistant")({ component: AssistantPage });

interface Message {
  sender: "user" | "ai";
  text: string;
}

function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello developer! 🌟 I'm DevAI, your AI engineering partner.\n\nHow is your coding sprint going? You can ask me to debug functions, review code styling, or plan algorithm practice questions!",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText("");
    
    const updatedMessages = [...messages, { sender: "user", text: userMessage } as Message];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Map chat messages to Gemini's history structure
      const history = updatedMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const response = await fetch(getApiUrl("/api/ai/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.text }]);
    } catch (err) {
      console.error(err);
      toast.error("Offline helper mode triggered...");
      
      let localReply = "I understand. I recommend double checking your local variables and error logging. Would you like to review an optimization strategy?";
      const msgLower = userMessage.toLowerCase();
      if (msgLower.includes("debug") || msgLower.includes("bug") || msgLower.includes("error")) {
        localReply = "To debug effectively: \n1. Isolate the execution block.\n2. Wrap async code in try-catch blocks.\n3. Log critical intermediate parameters.\nLet me know the details of your error!";
      } else if (msgLower.includes("react") || msgLower.includes("hook")) {
        localReply = "For React development, ensure hooks are declared at the top level of your components and all reactive states are specified in hook dependency arrays.";
      } else if (msgLower.includes("hello") || msgLower.includes("hi")) {
        localReply = "Hello! Ready to tackle your sprint tickets today? Let me know how I can help!";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: localReply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="DevAI Mascot Chat" contentClass="flex flex-col h-[calc(100vh-120px)] px-5 pb-4">
      {/* Scrollable messages container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-4 hide-scrollbar">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 animate-slide-in ${
              m.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                m.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-primary-soft text-primary"
              }`}
            >
              {m.sender === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </div>

            <div
              className={`rounded-2xl px-4 py-3 text-xs max-w-[80%] whitespace-pre-wrap leading-relaxed shadow-soft ${
                m.sender === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-card text-foreground rounded-tl-none border border-border/40"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* Loading typing bubble */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="rounded-2xl rounded-tl-none border border-border/40 bg-card px-4 py-3 text-xs text-muted-foreground flex gap-1 items-center shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested prompting chips */}
      {messages.length === 1 && (
        <div className="mb-3 flex flex-wrap gap-2 animate-in fade-in duration-300">
          {[
            { text: "Help me write a binary search" },
            { text: "Optimizing React performance" },
            { text: "Review a security error block" }
          ].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInputText(prompt.text)}
              className="flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1.5 text-[10px] font-bold text-muted-foreground hover:bg-muted/40 transition cursor-pointer"
            >
              <HelpCircle className="h-3 w-3 text-primary" />
              <span>{prompt.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input panel form */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 rounded-2xl bg-card border border-border p-1.5 shadow-soft"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask DevAI mascot about codes..."
          className="flex-1 bg-transparent px-3 py-2 text-xs outline-none text-foreground"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-soft hover:brightness-105 disabled:opacity-40 transition cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </Screen>
  );
}
