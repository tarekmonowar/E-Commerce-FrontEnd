import { format } from "date-fns";

export const getLastMonths = () => {
  const now = new Date();

  const getMonthName = (date: Date) =>
    date.toLocaleString("default", { month: "short" });

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6Months.push(getMonthName(d));
  }

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last12Months.push(getMonthName(d));
  }

  const last12DaysRaw: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    last12DaysRaw.push(d.toISOString().split("T")[0]);
  }

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const last12DaysLabels: string[] = last12DaysRaw.map((dateStr) => {
    if (dateStr === today) return "Today";
    if (dateStr === yesterday) return "Yesterday";
    return format(new Date(dateStr), "MMM d");
  });

  return { last6Months, last12Months, last12DaysRaw, last12DaysLabels };
};
