import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { HelpCircle } from "lucide-react";

export const Route = createFileRoute("/profile/settings/help")({ component: HelpPage });

function HelpPage() {
  const faqs = [
    { q: "Is code saved on the backend?", a: "No. Uploaded files are parsed dynamically via memory queue buffers and are never persisted." },
    { q: "How are ATS keywords optimized?", a: "Aura ATS coach scans details matching common senior specifications and inserts keywords variables." },
    { q: "Can I connect my GitHub profile?", a: "Yes. Simply input your username handle under Developer Details." }
  ];

  return (
    <Screen title="FAQ & Support">
      <div className="px-5 py-4 space-y-4 select-none">
        {faqs.map((faq, idx) => (
          <Card key={idx} variant="elevated" className="space-y-2">
            <h3 className="text-xs font-bold text-foreground flex items-start gap-2">
              <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <span>{faq.q}</span>
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed pl-6">{faq.a}</p>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
