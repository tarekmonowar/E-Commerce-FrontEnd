import { useEffect, useState, type JSX } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { CreditCard, DollarSign, Package, ShoppingCart } from "lucide-react";
import { useTheme } from "@/contexts/use-theme";

type Stats = {
  changePercent: {
    "revenue": number;
    "todaytransaction": number;
    "runningorder": number;
    "product sales": number;
  };
  count: {
    "revenue": number;
    "todaytransaction": number;
    "runningorder": number;
    "product sales": number;
  };
};

const ICONS = {
  "revenue": <CreditCard size={26} />,
  "todaytransaction": <DollarSign size={26} />,
  "runningorder": <Package size={26} />,
  "product sales": <ShoppingCart size={26} />,
};

const COLORS = {
  "revenue": { light: "#169976", dark: "aquamarine" },
  "todaytransaction": { light: "#FF2DF1", dark: "#F73F52" },
  "runningorder": { light: "#A76545", dark: "#FF9000" },
  "product sales": { light: "rgb(76,0,255)", dark: "#0077B6" },
};

const FALLBACK_COLOR = {
  light: "#F73F52",
  dark: "#F73F52",
};

const TITLES = {
  "revenue": "Total Revenue",
  "todaytransaction": "Today Transactions",
  "runningorder": "Running Orders",
  "product sales": "Products Sales",
};

export default function FourItems() {
  const { theme } = useTheme();
  const [cards, setCards] = useState<
    {
      key: keyof Stats["count"];
      title: string;
      icon: JSX.Element;
      value: string | number;
      percent: number;
      isUp: boolean;
      conicColor: string;
      textColor: string;
    }[]
  >([]);

  useEffect(() => {
    // Simulate backend response
    const stats: Stats = {
      changePercent: {
        "revenue": 85,
        "todaytransaction": 75,
        "runningorder": 94,
        "product sales": 37000,
      },
      count: {
        "revenue": 251540,
        "todaytransaction": 16000,
        "runningorder": 154,
        "product sales": 5154,
      },
    };

    const formatted = Object.keys(stats.count).map((key) => {
      const k = key as keyof Stats["count"];
      const percent = stats.changePercent[k];
      const value = stats.count[k];

      const cappedPercent = Math.min(Math.abs(percent), 9999);
      const isUp = percent >= 0;

      const colorObj = isUp ? COLORS[k] : FALLBACK_COLOR;
      const currentColor = colorObj[theme === "light" ? "light" : "dark"];

      const conicColor =
        theme === "light"
          ? `conic-gradient(${currentColor} 0deg ${cappedPercent}%, #cbd5e1 0)`
          : `conic-gradient(${currentColor} 0deg ${cappedPercent}%, #020617 0)`;

      return {
        key: k,
        title: TITLES[k],
        icon: ICONS[k],
        value:
          k === "product sales" || k === "runningorder"
            ? value.toLocaleString()
            : `$${value.toLocaleString()}`,
        percent: cappedPercent,
        isUp,
        conicColor,
        textColor: currentColor,
      };
    });

    setCards(formatted);
  }, [theme]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((item) => (
        <div className="card" key={item.key}>
          <div className="card-header">
            <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
              {item.icon}
            </div>
            <p className="card-title">{item.title}</p>
          </div>
          <div className="card-body flex flex-row justify-between bg-slate-300 transition-colors dark:bg-slate-950">
            <div>
              <p className="mb-3 text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                {item.value}
              </p>
              <span
                className={
                  `font-bold ` +
                  (item.isUp
                    ? "text-[#0C0950] dark:text-[rgb(0,195,0)]"
                    : "text-red-700 dark:text-red-500")
                }
              >
                {item.isUp ? <HiTrendingUp /> : <HiTrendingDown />}{" "}
                {item.isUp ? "+" : "-"}
                {item.percent}%
              </span>
            </div>
            <div
              className="relative h-20 w-20  rounded-full flex-shrink-0 grid place-items-center before:absolute before:h-17 before:w-17 before:rounded-full before:bg-slate-300 dark:before:bg-slate-950"
              style={{ backgroundImage: item.conicColor }}
            >
              <span
                className="relative font-bold"
                style={{ color: item.textColor }}
              >
                {item.isUp ? "+" : "-"}
                {item.percent}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
