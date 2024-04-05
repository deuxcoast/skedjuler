import ScheduleHeader from "@/components/scheduleHeader";
import { SidebarMenu } from "@/components/ui/sidebar-menu";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <ScheduleHeader />
      <div className="flex">
        <div className="hidden sm:block">
          <SidebarMenu />
        </div>
        <main className="flex">{children}</main>
      </div>
      {/* <SiteFooter /> */}
    </>
  );
}
