import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/profile/settings/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <Screen title="Privacy Policy">
      <div className="px-5 py-4 space-y-4 select-none">
        <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
          <div>
            <h2 className="text-xs font-bold text-foreground">Data Encryption Secure</h2>
            <p className="text-[10px] text-muted-foreground">All code submissions are parsed securely</p>
          </div>
        </div>

        <div className="space-y-3 leading-relaxed text-xs text-muted-foreground">
          <p>
            Your uploaded source code files are parsed out-of-band and processed directly inside local memory blocks. We do not store or persist code repositories in database schemas.
          </p>
          <p>
            Account details metrics (commits count, target goals milestones) are safely encrypted and handled directly via authenticated secure tokens interfaces.
          </p>
        </div>
      </div>
    </Screen>
  );
}
