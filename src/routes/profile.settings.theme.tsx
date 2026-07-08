import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, Sun, Moon } from "lucide-react";

export const Route = createFileRoute("/profile/settings/theme")({ component: ThemePage });

function ThemePage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const handleSelect = (val: string) => {
    setTheme(val);
    if (val === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    toast.success(`Theme updated to ${val}`);
  };

  return (
    <Screen title="Visual Theme">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)] select-none">
        <div className="space-y-4">
          <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft flex items-center gap-3">
            <Eye className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-xs font-bold text-foreground">App Appearance</h2>
              <p className="text-[10px] text-muted-foreground">Select system layout stylesheet styling</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSelect("light")}
              className={`p-5 rounded-2xl border text-center transition cursor-pointer ${
                theme === "light" ? "border-primary bg-primary-soft text-primary font-bold" : "border-border/40 bg-card text-foreground"
              }`}
            >
              <Sun className="mx-auto h-6 w-6 mb-2" />
              <span className="text-xs font-bold">Light Mode</span>
            </button>

            <button
              onClick={() => handleSelect("dark")}
              className={`p-5 rounded-2xl border text-center transition cursor-pointer ${
                theme === "dark" ? "border-primary bg-primary-soft text-primary font-bold" : "border-border/40 bg-card text-foreground"
              }`}
            >
              <Moon className="mx-auto h-6 w-6 mb-2" />
              <span className="text-xs font-bold">Dark Mode</span>
            </button>
          </div>
        </div>

        <div className="pt-4">
          <GradientButton onClick={() => toast.success("Appearance configurations saved")}>
            Save Theme Choice
          </GradientButton>
        </div>
      </div>
    </Screen>
  );
}
