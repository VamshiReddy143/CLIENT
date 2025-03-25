"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";

// Chart config with specified gradient URLs
const chartConfig = {
  value: {
    label: "Total",
  },
  newMarketOwners: {
    label: "New Market Owners",
    color: "url(#newMarketOwnersGradient)",
  },
  newVendors: {
    label: "New Vendors",
    color: "url(#newVendorsGradient)",
  },
  newListings: {
    label: "New Listings",
    color: "url(#newListingsGradient)",
  },
};

// Custom Legend Component
const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => {
        const category = entry.payload.category;
        const label = chartConfig[category]?.label || category;

        return (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${
                  category === "newMarketOwners"
                    ? "#FFD66B, #FFC107"
                    : category === "newVendors"
                    ? "#5B93FF, #3B82F6"
                    : "#FF8126, #FFAD1A"
                })`,
              }}
            />
            <span className="text-sm whitespace-nowrap">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export function Component() {
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [activityRate, setActivityRate] = React.useState(0);

  React.useEffect(() => {
    const fetchPlatformPerformance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to access the dashboard");
        }

        const response = await axios.get(
          "http://localhost:3000/api/admin/platform-performance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Platform Performance Data:", response.data);

        const mappedData = response.data.map((item) => ({
          ...item,
          fill:
            item.category === "newMarketOwners"
              ? "url(#newMarketOwnersGradient)"
              : item.category === "newVendors"
              ? "url(#newVendorsGradient)"
              : "url(#newListingsGradient)",
        }));

        setChartData(mappedData);

        const totalMarketOwnersResponse = await axios.get(
          "http://localhost:3000/api/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const totalMarketOwners = totalMarketOwnersResponse.data.filter(
          (user) => user.user_role === "market_owner"
        ).length;
        const newMarketOwners =
          response.data.find((item) => item.category === "newMarketOwners")
            ?.value || 0;
        const rate =
          totalMarketOwners > 0
            ? Math.round((newMarketOwners / totalMarketOwners) * 100)
            : 0;
        setActivityRate(rate);
      } catch (err) {
        console.error("Error fetching platform performance:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load platform performance data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlatformPerformance();
  }, []);

  const maxValue =
    chartData.length > 0 ? Math.max(...chartData.map((item) => item.value)) : 0;

  const enhancedChartData = chartData.map((item) => ({
    ...item,
    strokeWidth: item.value === maxValue ? 20 : item.value > maxValue / 2 ? 15 : 10,
  }));

  const defaultChartData = [
    {
      category: "newMarketOwners",
      value: 0,
      fill: "url(#newMarketOwnersGradient)",
    },
    { category: "newVendors", value: 0, fill: "url(#newVendorsGradient)" },
    { category: "newListings", value: 0, fill: "url(#newListingsGradient)" },
  ];

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <Card className="h-full w-full flex flex-col overflow-visible">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl text-[#030229]  ">
          Platform Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-4 pb-0 overflow-visible">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square lg:max-h-[280px] max-h-[300px]"
        >
          <PieChart>
            <defs>
              <linearGradient id="newMarketOwnersGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFD66B" />
                <stop offset="100%" stopColor="#FFC107" />
              </linearGradient>
              <linearGradient id="newVendorsGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5B93FF" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="newListingsGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF8126" />
                <stop offset="100%" stopColor="#FFAD1A" />
              </linearGradient>
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.length > 0 ? enhancedChartData : defaultChartData}
              dataKey="value"
              nameKey="category"
              innerRadius={55}
              outerRadius={93}
              strokeWidth={0}
              cornerRadius={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {activityRate}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<CustomLegend />}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Component;