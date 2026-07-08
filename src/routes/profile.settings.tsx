import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { User, Shield, Info, LifeBuoy, Eye, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile/settings")({ component: SettingsPage });

function SettingsPage() {
  const settingsList = [
    { title: "Account", desc: "Manage name & credentials", to: "/profile/settings/account", icon: User },
    { title: "Visual Theme", desc: "Toggle light/dark appearance", to: "/profile/settings/theme", icon: Eye },
    { title: "Privacy Policy", desc: "Check personal data boundaries", to: "/profile/settings/privacy", icon: Shield },
    { title: "Help & Support", desc: "Frequently asked questions", to: "/profile/settings/help", icon: LifeBuoy },
    { title: "About", desc: "Application version details", to: "/profile/settings/about", icon: Info }
  ];

  return (
    <Screen title="System Settings">
      <div className="px-5 py-4 space-y-3">
        {settingsList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link key={idx} to={item.to} className="block select-none">
              <Card variant="elevated" className="flex items-center justify-between p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground leading-tight">{item.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
              </Card>
            </Link>
          );
        })}
      </div>
    </Screen>
  );
}
