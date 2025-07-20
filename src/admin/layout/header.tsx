import { useTheme } from "@/contexts/use-theme";
import { MessageSquareCode, Moon, Search, Sun } from "lucide-react";
import { FaAnglesLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import profileImg from "/logo.png";

type HeaderProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10 cursor-pointer "
          onClick={() => setCollapsed(!collapsed)}
        >
          {/* <ChevronsLeft className={collapsed ? "rotate-180" : ""} /> */}
          <FaAnglesLeft
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
            size={25}
            style={{
              filter: "none",
              boxShadow: "none",
              WebkitFilter: "none",
            }}
          />
        </button>
        <div className="input">
          <Search size={20} className="text-slate-300" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-6">
        <button
          className="btn-ghost size-10 cursor-pointer -mr-4"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun size={27} className="dark:hidden" />
          <Moon size={27} className="hidden dark:block" />
        </button>
        <button
          className="btn-ghost cursor-pointer"
          onClick={() =>
            toast("🦄  Working....On Realtime Chat App!", {
              position: "top-right",
            })
          }
        >
          {/* <Bell size={20} /> */}
          <MessageSquareCode size={27} />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="size-9 mr-2 overflow-hidden rounded-full cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src={profileImg}
                alt="profile"
                className="size-full object-cover"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer bg-white hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700 font-bold text-[17px] justify-center "
              onClick={() => navigate("/")}
            >
              Home
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
