import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/contexts/use-click-outside";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import "../styles.css";

import { cn } from "@/lib/utils";

import { useEffect, useRef, useState } from "react";

const Layout = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
          !collapsed &&
            "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
        )}
      />

      <Sidebar
        ref={sidebarRef}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={cn(
          "transition-[margin] duration-300",
          collapsed ? "md:ml-[70px]" : "md:ml-[240px]",
        )}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
