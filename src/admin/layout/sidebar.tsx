import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import logoLight from "/logo.png";

import { navbarLinks } from "@/admin/components/constants";
import { cn } from "@/lib/utils";

import { useMediaQuery } from "@uidotdev/usehooks";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsed, setCollapsed }, ref) => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
      <aside
        ref={ref}
        className={cn(
          "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900 ",
          collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
          collapsed ? "max-md:-left-full" : "max-md:left-0",
        )}
      >
        <div className="flex gap-x-3 p-3">
          <img
            src={logoLight}
            alt="tmmonowar"
            className="h-30px] w-[30px] rounded-full dark:hidden"
          />
          <img
            src={logoLight}
            alt="tmonowar"
            className="h-30px] hidden  rounded-full w-[30px] dark:block"
          />
          {!collapsed && (
            <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">
              TMonowar
            </p>
          )}
        </div>
        <div className="scroll-hidden flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 pb-10">
          {navbarLinks.map((navbarLink) => (
            <nav
              key={navbarLink.title}
              className={cn(
                "flex w-full flex-col gap-y-2",
                collapsed && "md:items-center",
              )}
            >
              <p
                className={cn(
                  "overflow-hidden text-ellipsis text-sm font-medium text-slate-600 dark:text-slate-400",
                  collapsed && "md:w-[45px]",
                )}
              >
                {navbarLink.title}
              </p>
              {navbarLink.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  end={link.path === "/admin"}
                  className={cn("sidebar-item", collapsed && "md:w-[45px]")}
                  onClick={() => {
                    if (isMobile) setCollapsed(true); // ✅ Auto-close only on mobile
                  }}
                >
                  <link.icon size={22} className="flex-shrink-0" />
                  {!collapsed && (
                    <p className="whitespace-nowrap">{link.label}</p>
                  )}
                </NavLink>
              ))}
            </nav>
          ))}
        </div>
      </aside>
    );
  },
);
