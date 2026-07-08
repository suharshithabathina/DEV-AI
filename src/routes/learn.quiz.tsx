import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { HelpCircle, CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, BookOpen, Brain, Sparkles, Terminal } from "lucide-react";
import { getApiUrl } from "@/utils/api";

export const Route = createFileRoute("/learn/quiz")({ component: QuizPage });

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const SUGGESTED_TOPICS = [
  "React Hooks",
  "SQL Joins & Indexes",
  "Git Interactive Rebase",
  "Docker Containerization",
  "CORS Policies",
  "Big-O Algorithm Time Complexity"
];

function QuizPage() {
  const navigate = useNavigate();
  
  // Game states: "INPUT" | "LOADING" | "QUIZ" | "RESULTS"
  const [gameState, setGameState] = useState<"INPUT" | "LOADING" | "QUIZ" | "RESULTS">("INPUT");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Quiz execution states
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetTopic = topic.trim() || "General Software Engineering";
    setGameState("LOADING");

    try {
      const res = await fetch(getApiUrl("/api/ai/quiz"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: targetTopic })
      });

      if (!res.ok) {
        throw new Error("Failed to generate quiz from backend API");
      }

      const data = await res.json();
      if (data && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIdx(0);
        setSelected(null);
        setIsAnswered(false);
        setScore(0);
        setGameState("QUIZ");
        toast.success(`Generated 10 questions on '${targetTopic}'!`);
      } else {
        throw new Error("Invalid quiz data returned by API");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Connection refused to backend generator");
      setGameState("INPUT");
    }
  };

  const handleVerify = () => {
    if (selected === null || isAnswered || questions.length === 0) return;
    
    setIsAnswered(true);
    const currentQuestion = questions[currentIdx];
    if (selected === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
      toast.success("Correct answer!");
    } else {
      toast.error(`Incorrect! Correct answer is option ${currentQuestion.correctAnswer + 1}.`);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setGameState("RESULTS");
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setIsAnswered(false);
    setScore(0);
    setGameState("QUIZ");
  };

  // Get score-based suggestions
  const getFeedbackAndSuggestions = (scoreVal: number) => {
    const selectedTopicName = topic.trim() || "Software Engineering";
    if (scoreVal >= 9) {
      return {
        level: "Mastery Level",
        badge: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        message: `Outstanding! You have a solid grasp of '${selectedTopicName}'.`,
        suggestions: [
          `Study advanced system architecture related to ${selectedTopicName}.`,
          `Explore edge-cases, optimization patterns, and performance limits of ${selectedTopicName}.`,
          `Contribute to open source projects or write documentation reviewing ${selectedTopicName}.`
        ]
      };
    } else if (scoreVal >= 7) {
      return {
        level: "Competent Level",
        badge: "text-primary bg-primary/10 border-primary/20",
        message: `Great work! You have strong core knowledge in '${selectedTopicName}' with minor gaps.`,
        suggestions: [
          `Review common performance bottlenecks when deploying ${selectedTopicName}.`,
          `Practice debugging real-world exceptions involving ${selectedTopicName}.`,
          `Study intermediate to advanced coding patterns under ${selectedTopicName}.`
        ]
      };
    } else if (scoreVal >= 5) {
      return {
        level: "Practitioner Level",
        badge: "text-warning bg-warning/10 border-warning/20",
        message: `Good effort! Study standard design structures of '${selectedTopicName}' to improve.`,
        suggestions: [
          `Revisit the core APIs and lifecycle methods associated with ${selectedTopicName}.`,
          `Implement smaller sandbox utility projects strictly using ${selectedTopicName}.`,
          `Review documentation guidelines for standard setups of ${selectedTopicName}.`
        ]
      };
    } else {
      return {
        level: "Novice Level",
        badge: "text-destructive bg-destructive/10 border-destructive/20",
        message: `Keep studying! Building your basic foundations in '${selectedTopicName}' is key.`,
        suggestions: [
          `Go through beginner-friendly introductory tutorials on ${selectedTopicName}.`,
          `Understand basic data flows and configurations inside ${selectedTopicName}.`,
          `Write simple helper scripts or snippets to practice ${selectedTopicName}.`
        ]
      };
    }
  };

  // 1. Topic input screen
  if (gameState === "INPUT") {
    return (
      <Screen title="AI Quiz Generator">
        <div className="px-5 py-4 flex-1 flex flex-col justify-between min-h-[calc(100vh-120px)]">
          <form onSubmit={handleGenerateQuiz} className="space-y-6 my-auto w-full">
            {/* Top graphic block */}
            <div className="flex flex-col items-center text-center gap-2 mb-2 select-none">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-float animate-pulse">
                <Brain className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-black text-foreground mt-2">Dynamic Quiz Generator</h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                Type any technical topic below, and our AI will generate a custom 10-question evaluation quiz for you.
              </p>
            </div>

            {/* Input field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Target Topic
              </label>
              <div className="relative flex items-center">
                <Terminal className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="e.g. JavaScript Async, SQL Joins..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground font-semibold"
                />
              </div>
            </div>

            {/* Recommended topics suggestions tags */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Recommended Topics
              </p>
              <div className="flex flex-wrap gap-2 select-none">
                {SUGGESTED_TOPICS.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTopic(tag)}
                    className="text-[10px] font-bold text-muted-foreground hover:text-primary hover:border-primary border border-border/45 bg-card/65 px-3 py-1.5 rounded-full transition cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 select-none">
              <GradientButton type="submit">
                <Sparkles className="h-4.5 w-4.5" /> Generate 10 Questions
              </GradientButton>
            </div>
          </form>
        </div>
      </Screen>
    );
  }

  // 2. Loading state screen
  if (gameState === "LOADING") {
    return (
      <Screen title="AI Generator" noHeader>
        <div className="px-5 py-6 flex-1 flex flex-col justify-center items-center text-center min-h-[calc(100vh-60px)] select-none bg-gradient-hero">
          <div className="space-y-6 max-w-xs">
            <div className="relative flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-float animate-spin duration-3000">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-black text-foreground">Assembling Quiz...</h2>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Gemini is composing 10 challenging multiple-choice questions regarding <span className="font-semibold text-primary">'{topic || "General Software Engineering"}'</span> along with answer keys and context explanations.
              </p>
            </div>
            {/* Simulation loader dots */}
            <div className="flex justify-center gap-1.5 pt-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/45" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>
      </Screen>
    );
  }

  const feedback = getFeedbackAndSuggestions(score);
  const currentQuestion = questions[currentIdx];

  // 3. Quiz results screen
  if (gameState === "RESULTS") {
    return (
      <Screen title="Quiz Score Overview" noHeader>
        <div className="px-5 py-6 flex-1 flex flex-col justify-between min-h-[calc(100vh-60px)]">
          <div className="space-y-6 text-center">
            {/* Top Badge Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-float text-white animate-bounce">
              <Award className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-foreground">Evaluation Completed!</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${feedback.badge}`}>
                {feedback.level}
              </span>
            </div>

            {/* Score Ring Display */}
            <div className="mx-auto flex h-32 w-32 flex-col items-center justify-center rounded-full bg-card border-4 border-primary/20 shadow-soft">
              <p className="text-3xl font-black text-foreground">{score}</p>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">out of 10</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Topic: {topic || "General Software Engineering"}</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {feedback.message}
              </p>
            </div>

            {/* Suggestions Card */}
            <div className="rounded-2xl bg-card border border-border/10 p-5 text-left shadow-soft space-y-3">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5 select-none">
                <BookOpen className="h-4.5 w-4.5 text-primary" /> Recommended Focus Areas
              </h3>
              <ul className="space-y-2 text-[11px] text-muted-foreground list-disc pl-4 leading-relaxed">
                {feedback.suggestions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 space-y-2.5">
            <GradientButton onClick={handleRestart}>
              <RotateCcw className="h-4.5 w-4.5" /> Retake Same Quiz
            </GradientButton>
            <GradientButton onClick={() => setGameState("INPUT")} variant="outline">
              Choose Another Topic
            </GradientButton>
          </div>
        </div>
      </Screen>
    );
  }

  // 4. Active quiz questions screen
  return (
    <Screen title="Sprint Quiz">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between min-h-[calc(100vh-120px)]">
        <div className="space-y-5">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <span className="truncate max-w-[150px]">{topic || "General Quiz"}</span>
              <span>Question {currentIdx + 1} of {questions.length}</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="rounded-2xl bg-card border border-border/10 p-5 shadow-soft flex gap-3 select-none">
            <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-foreground leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const active = selected === idx;
              const isCorrect = idx === currentQuestion.correctAnswer;
              
              let buttonStyle = "border-border/40 bg-card text-foreground";
              if (active && !isAnswered) {
                buttonStyle = "border-primary bg-primary-soft text-primary font-bold";
              } else if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = "border-success bg-success/10 text-success-foreground font-bold";
                } else if (active) {
                  buttonStyle = "border-destructive bg-destructive/10 text-destructive-foreground font-bold";
                } else {
                  buttonStyle = "border-border/20 bg-card text-muted-foreground opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left p-4 rounded-2xl text-xs leading-relaxed border transition cursor-pointer select-none ${buttonStyle}`}
                >
                  <div className="flex justify-between items-center">
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="h-4 w-4 text-success shrink-0 ml-2" />}
                    {isAnswered && active && !isCorrect && <XCircle className="h-4 w-4 text-destructive shrink-0 ml-2" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Answer explanation panel */}
          {isAnswered && (
            <div className="rounded-2xl bg-muted/60 border border-border/20 p-4 animate-slide-in">
              <p className="text-[10px] font-bold text-foreground uppercase tracking-wider">Concept Explanation</p>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="pt-6 select-none">
          {!isAnswered ? (
            <GradientButton onClick={handleVerify} disabled={selected === null}>
              Submit Answer
            </GradientButton>
          ) : (
            <GradientButton onClick={handleNext}>
              {currentIdx < questions.length - 1 ? (
                <>Next Question <ArrowRight className="h-4.5 w-4.5" /></>
              ) : (
                "Finish Quiz"
              )}
            </GradientButton>
          )}
        </div>
      </div>
    </Screen>
  );
}

