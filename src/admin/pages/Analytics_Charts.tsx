import { PieChart, DoughnutChart } from "../components/Charts";
import { Card, CardContent } from "@/components/ui/card";

const PieCharts = () => {
  // 🧪 Mock Data
  const charts = {
    orderFullfilment: {
      processing: 30,
      shipped: 45,
      delivered: 25,
    },
    productcategories: [{ Electronics: 40 }, { Clothing: 25 }, { Beauty: 35 }],
    stockAvailability: {
      inStock: 75,
      outOfStock: 25,
    },
    revenueDistribution: {
      marketingCost: 20,
      discount: 10,
      burnt: 5,
      productionCost: 40,
      netMargin: 25,
    },
    usersAgeGroup: {
      teen: 15,
      adult: 60,
      old: 25,
    },
    adminCustomer: {
      admin: 5,
      customer: 95,
    },
  };

  return (
    <div className="flex flex-col gap-6 mt-5 xl:mt-10">
      <h1 className="text-2xl xl:text-4xl font-bold dark:text-white">
        Charts Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 xl:p-20">
        {/* Generic Chart Card */}
        {[
          {
            chart: (
              <DoughnutChart
                labels={["Admin", "Customer"]}
                data={[
                  charts.adminCustomer.admin,
                  charts.adminCustomer.customer,
                ]}
                backgroundColor={["hsl(335, 100%, 45%)", "hsl(210, 100%, 60%)"]}
                offset={[0, 40]}
              />
            ),
            title: "Users Role Ratio",
          },
          {
            chart: (
              <DoughnutChart
                labels={charts.productcategories.map((i) => Object.keys(i)[0])}
                data={charts.productcategories.map((i) => Object.values(i)[0])}
                backgroundColor={["#6366F1", "#10B981", "#F59E0B"]}
                offset={[5, 0]}
              />
            ),
            title: "Product Categories",
          },
          {
            chart: (
              <PieChart
                labels={["Processing", "Shipped", "Delivered"]}
                data={[
                  charts.orderFullfilment.processing,
                  charts.orderFullfilment.shipped,
                  charts.orderFullfilment.delivered,
                ]}
                backgroundColor={[
                  "hsl(210, 100%, 60%)",
                  "hsl(0, 80%, 60%)",
                  "hsl(260, 80%, 70%)",
                ]}
              />
            ),
            title: "Order Fulfillment",
          },

          {
            chart: (
              <DoughnutChart
                labels={["In Stock", "Out Of Stock"]}
                data={[
                  charts.stockAvailability.inStock,
                  charts.stockAvailability.outOfStock,
                ]}
                backgroundColor={["hsl(210, 100%, 60%)", "hsl(335, 100%, 45%)"]}
                offset={[10, 0]}
                cutout="60%"
              />
            ),
            title: "Stock Availability",
          },
          {
            chart: (
              <DoughnutChart
                labels={[
                  "Marketing Cost",
                  "Discount",
                  "Burnt",
                  "Production Cost",
                  "Net Margin",
                ]}
                data={[
                  charts.revenueDistribution.marketingCost,
                  charts.revenueDistribution.discount,
                  charts.revenueDistribution.burnt,
                  charts.revenueDistribution.productionCost,
                  charts.revenueDistribution.netMargin,
                ]}
                backgroundColor={[
                  "hsl(200, 70%, 60%)",
                  "hsl(50, 100%, 50%)",
                  "hsl(0, 100%, 70%)",
                  "hsl(120, 80%, 40%)",
                  "hsl(260, 80%, 70%)",
                ]}
                offset={[10, 10, 10, 10, 10, 10]}
              />
            ),
            title: "Revenue Distribution",
          },
          {
            chart: (
              <PieChart
                labels={["Teenager (Below 20)", "Adult (20–40)", "Older (40+)"]}
                data={[
                  charts.usersAgeGroup.teen,
                  charts.usersAgeGroup.adult,
                  charts.usersAgeGroup.old,
                ]}
                backgroundColor={[
                  "hsl(280, 100%, 70%)",
                  "hsl(210, 100%, 60%)",
                  "hsl(0, 80%, 60%)",
                ]}
                offset={[0, 0, 40]}
              />
            ),
            title: "Users Age Group",
          },
        ].map(({ chart, title }, i) => (
          <Card
            key={i}
            className="bg-white border-gray-300 dark:bg-gray-900 dark:border dark:border-gray-800 shadow-2xl max-w-[600px] max-h-[600px]"
          >
            <CardContent className=" flex flex-col items-center">
              <p className="my-4 mb-7 font-bold dark:text-white text-base md:text-[25px] text-center">
                {title}
              </p>
              <div className=" w-full h-[80%] ">{chart}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PieCharts;
