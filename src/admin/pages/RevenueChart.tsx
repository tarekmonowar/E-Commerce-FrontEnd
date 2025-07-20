import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart } from "../components/Charts";
import { getLastMonths } from "../components/getLastMonths";

const { last6Months, last12DaysLabels } = getLastMonths();

const mockCharts = {
  revenue: {
    last6Months: [30000, 45000, 38000, 60000, 72000, 50000],
    last12Days: [
      4000, 5000, 6000, 4200, 4600, 5500, 5700, 6100, 6700, 6900, 7200, 7500,
    ],
  },
  orders: {
    last6Months: [120, 150, 140, 170, 180, 160],
    last12Days: [12, 15, 14, 17, 18, 16, 13, 14, 15, 17, 18, 19],
  },
};

const last12DaysData = last12DaysLabels.map((label, index) => ({
  name: label,
  revenue: mockCharts.revenue.last12Days[index],
  orders: mockCharts.orders.last12Days[index],
}));

const BarCharts = () => {
  const charts = mockCharts;

  return (
    <div>
      <h1 className="text-2xl xl:text-3xl font-bold mb-4 xl:mb-8 xl:mt-8 dark:text-white">
        Revenue And Orders Analytics
      </h1>

      {/* ✅ Vertical Bar - Last 6 Months */}
      <section className="bg-white dark:bg-gray-900 rounded-md p-4 shadow-md max-w-5xl mx-auto mb-10">
        <BarChart
          labels={last6Months}
          data_1={charts.revenue.last6Months}
          data_2={charts.orders.last6Months}
          title_1="Revenue"
          title_2="Orders"
          bgColor_1="hsl(200, 70%, 60%)"
          bgColor_2="hsl(340, 80%, 70%)"
        />
        <h2 className="text-xl font-semibold mt-4 text-center dark:text-white/80">
          Revenue & Orders (Last 6 Months)
        </h2>
      </section>

      {/* ✅ Horizontal Bar - Last 12 Days */}
      <section className="bg-white dark:bg-gray-900 rounded-md p-4 pt-10 shadow-md max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center dark:text-white/80">
          Revenue & Orders (Last 12 Days)
        </h2>

        <ResponsiveContainer width="100%" height={500}>
          <AreaChart
            data={last12DaysData}
            margin={{ top: 40, right: 10, left: 0, bottom: 60 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="75%" stopColor="#2563eb" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="75%" stopColor="#10b981" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              stroke="#888"
              tickMargin={20}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              yAxisId="left"
              stroke="#888"
              tickFormatter={(value) => `$${value}`}
              tickMargin={10}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#888"
              tickFormatter={(value) => `${value} orders`}
              tickMargin={10}
            />

            <Tooltip
              formatter={(value, name) => {
                if (name === "Revenue") return [`$${value}`, "Revenue"];
                if (name === "Orders") return [`${value}`, "Orders"];
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
              fillOpacity={0.5}
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
              fillOpacity={0.5}
              fill="url(#colorOrders)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default BarCharts;
