import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Calendar, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/home/calendar")({ component: CalendarPage });

function CalendarPage() {
  const events = [
    { title: "Weekly Sprint Retrospective", time: "10:00 AM - 11:30 AM", type: "Work session" },
    { title: "System Design Mock Interview", time: "2:00 PM - 3:00 PM", type: "Practice round" },
    { title: "Binary tree quiz deadline", time: "6:00 PM", type: "Milestone target" }
  ];

  return (
    <Screen title="Sprint Planner" bottomNav>
      <div className="px-5 py-4 space-y-4">
        {/* Simple visual calendar sheet */}
        <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between border-b border-border/20 pb-3 mb-4">
            <h2 className="text-sm font-bold text-foreground">July 2026</h2>
            <Calendar className="h-4.5 w-4.5 text-primary" />
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-muted-foreground select-none">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isToday = day === 5;
              return (
                <span
                  key={i}
                  className={`py-1.5 rounded-lg flex items-center justify-center ${
                    isToday ? "bg-primary text-white" : "hover:bg-muted"
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>

        {/* Event schedules */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Scheduled Today</h3>
          {events.map((event, idx) => (
            <Card key={idx} variant="elevated">
              <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{event.type}</span>
              <h4 className="text-xs font-bold text-foreground mt-0.5 mb-1.5">{event.title}</h4>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 select-none">
                <Clock className="h-3 w-3" /> {event.time}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}
