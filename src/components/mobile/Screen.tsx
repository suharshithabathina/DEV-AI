import { ReactNode } from "react";
import { StatusBar } from "./StatusBar";
import { ScreenHeader } from "./ScreenHeader";
import { BottomNav } from "./BottomNav";

interface ScreenProps {
  children: ReactNode;
  title?: string;
  back?: boolean;
  headerRight?: ReactNode;
  bottomNav?: boolean;
  noHeader?: boolean;
  bgClass?: string;
  contentClass?: string;
  transparentHeader?: boolean;
}

export function Screen({
  children,
  title,
  back = true,
  headerRight,
  bottomNav = false,
  noHeader = false,
  bgClass = "bg-background",
  contentClass = "",
  transparentHeader = false,
}: ScreenProps) {
  return (
    <div className={`mobile-frame flex flex-col ${bgClass}`}>
      <StatusBar />
      {!noHeader && (
        <ScreenHeader title={title} back={back} right={headerRight} transparent={transparentHeader} />
      )}
      <main className={`flex-1 min-h-0 overflow-y-auto hide-scrollbar flex flex-col ${contentClass.replace(/\bh-full\b/g, "")}`}>
        {children}
      </main>
      {bottomNav && <BottomNav />}
      
      {/* iOS Home Indicator Bar Simulator for Desktop Viewports */}
      <div className="hidden md:flex h-5 w-full bg-background/95 backdrop-blur-md shrink-0 pb-1.5 items-end justify-center select-none z-20">
        <div className="h-1 w-32 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}
