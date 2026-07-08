import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { useState } from "react";
import { Terminal, Search, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/home/search")({ component: SearchPage });

function SearchPage() {
  const [query, setQuery] = useState("");
  const items = [
    { title: "React performance hooks check", category: "Optimization" },
    { title: "Security rules for token keys", category: "Security" },
    { title: "Binary tree algorithm structures", category: "Daily Learning" }
  ];

  const filtered = items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Screen title="Workspace Search">
      <div className="px-5 py-4 space-y-4">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search code bases or lessons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
          />
        </div>

        <div className="space-y-2">
          {filtered.map((item, idx) => (
            <Card key={idx} variant="elevated" className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{item.category}</span>
                <h3 className="text-xs font-bold text-foreground mt-0.5">{item.title}</h3>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-xs text-muted-foreground">No matches found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}
