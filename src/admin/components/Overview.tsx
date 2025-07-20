import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { overviewData } from "../components/constants";
import { useTheme } from "@/contexts/use-theme";
import TableOverview from "./TableOverview";

export default function Overview() {
  const { theme } = useTheme();

  //  const [overviewData, setOverviewData] = useState<
  //   { name: string; revenue: number; orders: number }[]
  // >([]);
  // Simulate fetching backend stats
  // useEffect(() => {
  //   const stats = {
  //     chart: {
  //       orders: [0, 0, 0, 0, 0, 9],
  //       revenue: [0, 0, 0, 0, 0, 530648],
  //     },
  //   };

  //   const { last6Months } = getLastMonths();

  //   const formatted = last6Months.map((month, index) => ({
  //     name: month,
  //     revenue: stats.chart.revenue[index],
  //     orders: stats.chart.orders[index],
  //   }));

  //   setOverviewData(formatted);
  // }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="flex flex-col gap-y-4 rounded-lg border border-slate-300 bg-white p-4 transition-colors dark:border-slate-700 dark:bg-slate-900 col-span-1 pr-0 md:col-span-2 lg:col-span-4">
        <div className="card-header">
          <p className="card-title">Overview</p>
        </div>
        <div className="flex flex-row gap-y-2 rounded-lg p-0">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={overviewData}
              margin={{ top: 20, right: 15, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="name"
                stroke={theme === "light" ? "black" : "white"}
                tickMargin={6}
              />

              {/* Primary Y-axis for revenue */}
              <YAxis
                yAxisId="left"
                stroke="#2563eb"
                tickFormatter={(value) => `$${value}`}
                tickMargin={6}
              />

              {/* Secondary Y-axis for orders */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#10b981"
                tickFormatter={(value) => `${value} orders`}
                tickMargin={6}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "Revenue") {
                    return [`$${value}`, "Revenue"];
                  } else if (name === "Orders") {
                    return [`${value}`, "Orders"];
                  }
                  return [value, name];
                }}
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 2 }}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 2 }}
                fillOpacity={1}
                fill="url(#colorOrders)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card col-span-1 md:col-span-2 lg:col-span-3">
        <div className="card-header">
          <p className="card-title">Recent Sales</p>
        </div>
        <div className="flex flex-row gap-y-2 rounded-lg scrollbar-hide h-[300px] overflow-auto p-0 dark:bg-slate-950 bg-slate-300">
          <TableOverview />
        </div>
      </div>
    </div>
  );
}
