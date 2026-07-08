import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/utils/api";

export const Route = createFileRoute("/profile/details")({ component: ProfileDetailsPage });

function ProfileDetailsPage() {
  const [profile, setProfile] = useState<any>({
    role: "Junior Frontend Engineer",
    company: "SaaS StartUp",
    experience: "2 years",
    github_handle: "@dev_nikhila"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('demo_user_id') || 'demo-user-id';
    const loadProfile = async () => {
      try {
        const res = await fetch(getApiUrl(`/api/profiles/${userId}`));
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setProfile(data);
          }
        }
      } catch (err) {
        console.error("Failed to load details from backend:", err);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem('demo_user_id') || 'demo-user-id';

    try {
      const res = await fetch(getApiUrl(`/api/profiles/${userId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error("Backend save failed");
      toast.success("Developer details updated successfully!");
    } catch (err) {
      console.error(err);
      toast.success("Details updated locally!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Developer Details">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Current Role</label>
            <input
              type="text"
              required
              value={profile.role || ""}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Company / Team</label>
            <input
              type="text"
              required
              value={profile.company || ""}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Experience Level</label>
            <input
              type="text"
              required
              value={profile.experience || ""}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">GitHub Username</label>
            <input
              type="text"
              value={profile.github_handle || ""}
              onChange={(e) => setProfile({ ...profile, github_handle: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="pt-4 select-none">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Details"}
            </GradientButton>
          </div>
        </form>
      </div>
    </Screen>
  );
}
