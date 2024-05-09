import SchedulerHeader from "@/components/scheduler-header";
import { AppProvider } from "@/lib/context/AppContext";

interface SchedulerAppLayoutProps {
  children: React.ReactNode;
}

export default function SchedulerAppLayout({
  children,
}: SchedulerAppLayoutProps) {
  return (
    <AppProvider>
      <SchedulerHeader />
      <div className="container flex max-w-screen-2xl h-screen justify-center align-middle ">
        {children}
      </div>
    </AppProvider>
  );
}
