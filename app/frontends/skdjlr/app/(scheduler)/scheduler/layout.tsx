import SchedulerHeader from "@/components/scheduler-header";
import { Sidebar } from "@/components/sidebar-menu";
import { playlists } from "@/data/playlists";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function SchedulerLayout({ children }: AppLayoutProps) {
  return (
    <div className="border-t">
      <div className="grid lg:grid-cols-5">
        <Sidebar playlists={playlists} className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l">{children}</div>
      </div>
    </div>
  );
}
