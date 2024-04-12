import { Sidebar } from "@/components/sidebar-menu";
import { playlists } from "@/data/playlists";
import { Fragment } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function SchedulerLayout({ children }: AppLayoutProps) {
  return (
    // TODO: Figure out how the sidebar menu will be implemented in schduler
    // view. I've removed it for now.
    <Fragment>
      {/* <div className="border-t flex"> */}
      {/* <div className="grid lg:grid-cols-5"> */}
      {/* <Sidebar playlists={playlists} className="hidden lg:block" /> */}
      {/* <div className="col-span-5 lg:col-span-5 ">{children}</div> */}

      {children}
      {/* </div> */}
    </Fragment>
  );
}
