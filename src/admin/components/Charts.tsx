import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
);

const months = ["January", "February", "March", "April", "May", "June", "July"];

interface BarChartProps {
  horizontal?: boolean;
  data_1: number[];
  data_2: number[];
  title_1: string;
  title_2: string;
  bgColor_1: string;
  bgColor_2: string;
  labels?: string[];
}

export const BarChart = ({
  data_1 = [],
  data_2 = [],
  title_1,
  title_2,
  bgColor_1,
  bgColor_2,
  horizontal = false,
  labels = [],
}: BarChartProps) => {
  const maxData1 = Math.max(...data_1);
  const maxData2 = Math.max(...data_2);
  const max1 = Math.ceil(maxData1 * 1.1);
  const max2 = Math.ceil(maxData2 * 1.1);

  // Scales config for vertical or horizontal bars
  const scales = {
    x: {
      type: "category" as const,
      grid: { display: false },
      ticks: { color: "#888" },
    },
    y: {
      type: "linear" as const,
      beginAtZero: true,
      max: max1,
      grid: { display: false },
      ticks: { color: "#888" },
      title: { display: true, text: title_1, color: "#888" },
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      beginAtZero: true,
      max: max2,
      position: "right" as const,
      grid: { drawOnChartArea: false },
      ticks: { color: "#888" },
      title: { display: true, text: title_2, color: "#888" },
    },
  };

  // Dataset axis IDs depending on orientation
  const datasets = [
    {
      label: title_1,
      data: data_1,
      backgroundColor: bgColor_1,
      yAxisID: "y",
      xAxisID: "x",
      barThickness: "flex" as const,
      barPercentage: 1,
      categoryPercentage: 0.4,
    },
    {
      label: title_2,
      data: data_2,
      backgroundColor: bgColor_2,
      yAxisID: "y1",
      xAxisID: "x",
      barThickness: "flex" as const,
      barPercentage: 1,
      categoryPercentage: 0.4,
    },
  ];

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "#666" },
      },
      title: { display: false },
    },
    scales,
  };

  return <Bar options={options} data={data} />;
};

//  ! for doughnut chart

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  cutout?: number | string;
  legends?: boolean;
  offset?: number[];
}

export const DoughnutChart = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}: DoughnutChartProps) => {
  const doughnutData: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: "bottom",
        labels: {
          padding: 20,
          boxWidth: 25,
          // Trick: Limit max legend width using max height container
        },
      },
    },
    cutout,
  };

  return (
    <div className="w-full flex justify-center items-center md:max-w-[500px] max-h-[350px]   mx-auto ">
      <Doughnut data={doughnutData} options={doughnutOptions} />
    </div>
  );
};

// ! for pie chart

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  offset?: number[];
  legends?: boolean;
}
export const PieChart = ({
  labels,
  data,
  backgroundColor,
  offset,
  legends = true,
}: PieChartProps) => {
  const pieChartData: ChartData<"pie", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
        offset,
      },
    ],
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: "bottom",
        labels: {
          padding: 20,
          boxWidth: 25,
          // Trick: Limit max legend width using max height container
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center items-center md:max-w-[500px] max-h-[350px]   mx-auto ">
      <Pie data={pieChartData} options={pieChartOptions} />
    </div>
  );
};

// ! for line chart

interface LineChartProps {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  labels?: string[];
}

export const LineChart = ({
  data,
  label,
  backgroundColor,
  borderColor,
  labels = months,
}: LineChartProps) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineChartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        fill: true,
        label,
        data,
        backgroundColor,
        borderColor,
      },
    ],
  };

  return <Line options={options} data={lineChartData} />;
};
