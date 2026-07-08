import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { Terminal, Lock, Mail, User } from "lucide-react";
import { getApiUrl } from "@/utils/api";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all input fields");
      return;
    }
    if (!agree) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }
      
      localStorage.setItem('demo_name', name);
      localStorage.setItem('demo_email', email);
      toast.success("Account created successfully!");
      navigate({ to: "/login" });
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.message || "Failed to connect to authentication service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen noHeader bgClass="bg-background" contentClass="p-6 flex flex-col h-full">
      <div className="space-y-6 my-auto w-full">
        {/* Brand layout */}
        <div className="flex flex-col items-center text-center gap-2 mb-2 select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black text-foreground mt-2">Create Account</h2>
          <p className="text-xs text-muted-foreground">Sign up to access AI productivity features</p>
        </div>

        {/* Auth form details */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <User className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Developer Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="relative flex items-center">
            <Mail className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center gap-2.5 px-1 py-1 select-none">
            <input
              type="checkbox"
              id="agree-terms"
              required
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4.5 w-4.5 rounded-lg border-border text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <label htmlFor="agree-terms" className="text-xs text-muted-foreground cursor-pointer select-none">
              I agree to the <span className="font-semibold text-primary hover:underline">Terms & Conditions</span>
            </label>
          </div>

          <div className="pt-2">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
            </GradientButton>
          </div>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          <span>Already have an account? </span>
          <Link to="/login" className="font-semibold text-primary hover:underline cursor-pointer">
            Log In
          </Link>
        </div>
      </div>
    </Screen>
  );
}
