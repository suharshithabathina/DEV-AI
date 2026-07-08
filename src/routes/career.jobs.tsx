import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Briefcase, MapPin, Compass } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/career/jobs")({ component: JobsPage });

function JobsPage() {
  const jobListings = [
    { title: "Senior React Engineer", company: "SaaS Devs Inc.", location: "Remote", type: "Full-Time" },
    { title: "Fullstack Node Developer", company: "FinTech Hub", location: "New York, NY", type: "Contract" }
  ];

  return (
    <Screen title="Recommended Jobs">
      <div className="px-5 py-4 space-y-4">
        {jobListings.map((job, idx) => (
          <Card key={idx} variant="elevated" className="space-y-3">
            <div className="flex justify-between items-start border-b border-border/10 pb-2">
              <div>
                <h3 className="text-xs font-bold text-foreground leading-tight">{job.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{job.company}</p>
              </div>
              <span className="text-[8px] font-extrabold px-1.5 py-0.5 bg-primary-soft text-primary rounded">{job.type}</span>
            </div>
            
            <div className="flex justify-between items-center select-none">
              <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {job.location}
              </span>
              
              <button
                onClick={() => toast.success(`Application submitted to ${job.company}!`)}
                className="text-[10px] font-bold text-white px-3.5 py-1.5 bg-primary rounded-xl cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
