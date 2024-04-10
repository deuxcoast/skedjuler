import SchedulerHeader from "@/components/scheduler-header";

interface SchedulerAppLayoutProps {
  children: React.ReactNode;
}

export default function SchedulerAppLayout({
  children,
}: SchedulerAppLayoutProps) {
  return (
    <>
      <SchedulerHeader />
      <div className="container flex max-w-screen-2xl h-screen justify-center align-middle ">
        {children}
      </div>
    </>
  );
}
