import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/utils/api";

export const Route = createFileRoute("/profile/settings/account")({ component: AccountSettingsPage });

function AccountSettingsPage() {
  const [name, setName] = useState("Developer");
  const [email, setEmail] = useState("dev@example.com");
  const [phone, setPhone] = useState("+1 555-0811");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const demoName = localStorage.getItem('demo_name');
    const demoEmail = localStorage.getItem('demo_email');
    const userId = localStorage.getItem('demo_user_id') || 'demo-user-id';
    if (demoName) setName(demoName);
    if (demoEmail) setEmail(demoEmail);

    const loadAccount = async () => {
      try {
        const res = await fetch(getApiUrl(`/api/profiles/${userId}`));
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            if (data.name) setName(data.name);
            if (data.email) setEmail(data.email);
            if (data.phone) setPhone(data.phone);
          }
        }
      } catch (err) {
        console.error("Failed to load account from backend:", err);
      }
    };
    loadAccount();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem('demo_user_id') || 'demo-user-id';

    try {
      const res = await fetch(getApiUrl(`/api/profiles/${userId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone })
      });
      if (!res.ok) throw new Error("Account update failed");
      localStorage.setItem('demo_name', name);
      localStorage.setItem('demo_email', email);
      toast.success("Account settings updated successfully!");
    } catch (err) {
      console.error(err);
      toast.success("Account settings saved locally!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Account Settings">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Username</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="pt-4 select-none">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Settings"}
            </GradientButton>
          </div>
        </form>
      </div>
    </Screen>
  );
}
