// "use client"

// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartContainer,
//   ChartTooltip,
// } from "@/components/ui/chart"

// // Custom dot component with white center
// const CustomDot = (props) => {
//   const { cx, cy } = props
//   return (
//     <g>
//       <circle cx={cx} cy={cy} r={8} fill="#FF8126" />
//       <circle cx={cx} cy={cy} r={3} fill="white" />
//     </g>
//   )
// }

// // Custom tooltip content to position directly on the point
// const CustomTooltip = ({ active, payload, coordinate }) => {
//   if (active && payload && payload.length) {
//     const value = payload[0].value
//     const formattedValue = Number(value).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })

//     return (
//       <div
//         className="bg-[#FF8126] text-white p-2 rounded-md shadow-lg relative"
//         style={{
//           position: "absolute",
//           left: coordinate.x - 50,
//           top: coordinate.y - 40,
//           width: "100px",
//           textAlign: "center",
//         }}
//       >
//         <span>Revenue ${formattedValue}</span>
//         <div
//           style={{
//             position: "absolute",
//             bottom: "-8px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: 0,
//             height: 0,
//             borderLeft: "8px solid transparent",
//             borderRight: "8px solid transparent",
//             borderTop: "8px solid #FF8126",
//           }}
//         />
//       </div>
//     )
//   }
//   return null
// }

// export function Graph({ data = [] }) {
//   const chartConfig = {
//     desktop: {
//       label: "Revenue",
//       color: "url(#desktopGradient)",
//     },
//     mobile: {
//       label: "Mobile",
//       color: "hsl(var(--chart-2))",
//     },
//   }

//   const maxValue = data.length > 0 ? Math.max(...data.map(item => item.desktop || 0)) : 60
//   const yAxisMax = Math.ceil(maxValue / 100) * 100

//   return (
//     <Card className="h-full w-full">
//       <CardHeader>
//         <CardTitle className="text-2xl text-[#030229]">Revenue</CardTitle>
//       </CardHeader>
//       <CardContent className="h-full p-4"> {/* Adjusted padding */}
//         <ChartContainer config={chartConfig} className="h-[300px] w-full"> {/* Set a reasonable height */}
//           <LineChart
//             accessibilityLayer
//             data={data.length > 0 ? data : chartData}
//             margin={{
//               top: 20,
//               left: 12,
//               right: 12,
//               bottom: 10,
//             }}
//           >
//             <defs>
//               <linearGradient id="desktopGradient" x1="0" y1="0" x2="1" y2="0">
//                 <stop offset="0%" stopColor="#FF8126" />
//                 <stop offset="100%" stopColor="#FFAD1A" />
//               </linearGradient>
//             </defs>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               domain={[0, yAxisMax]}
//               interval="preserveStartEnd"
//               width={30}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<CustomTooltip />}
//             />
//             <Line
//               dataKey="desktop"
//               type="natural"
//               stroke="url(#desktopGradient)"
//               strokeWidth={4}
//               dot={<CustomDot />}
//               activeDot={{
//                 r: 10,
//                 fill: "#FF8126",
//                 stroke: "white",
//                 strokeWidth: 2,
//               }}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]




// "use client"

// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartContainer,
//   ChartTooltip,
// } from "@/components/ui/chart"

// // Custom dot component with white center
// const CustomDot = (props) => {
//   const { cx, cy } = props
//   return (
//     <g>
//       <circle cx={cx} cy={cy} r={8} fill="#FF8126" />
//       <circle cx={cx} cy={cy} r={3} fill="white" />
//     </g>
//   )
// }

// // Custom tooltip content to position directly on the point
// const CustomTooltip = ({ active, payload, coordinate }) => {
//   if (active && payload && payload.length) {
//     const value = payload[0].value
//     const formattedValue = Number(value).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })

//     return (
//       <div
//         className="bg-[#FF8126] text-white p-2 rounded-md shadow-lg relative"
//         style={{
//           position: "absolute",
//           left: coordinate.x - 50,
//           top: coordinate.y - 40,
//           width: "100px",
//           textAlign: "center",
//         }}
//       >
//         <span>Revenue ${formattedValue}</span>
//         <div
//           style={{
//             position: "absolute",
//             bottom: "-8px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: 0,
//             height: 0,
//             borderLeft: "8px solid transparent",
//             borderRight: "8px solid transparent",
//             borderTop: "8px solid #FF8126",
//           }}
//         />
//       </div>
//     )
//   }
//   return null
// }

// export function Graph({ data = [] }) {
//   const chartConfig = {
//     desktop: {
//       label: "Revenue",
//       color: "url(#desktopGradient)",
//     },
//     mobile: {
//       label: "Mobile",
//       color: "hsl(var(--chart-2))",
//     },
//   }

//   const maxValue = data.length > 0 ? Math.max(...data.map(item => item.desktop || 0)) : 60
//   const yAxisMax = Math.ceil(maxValue / 100) * 100

//   return (
//     <Card className="h-full w-full">
//       <CardHeader>
//         <CardTitle className="text-2xl text-[#030229]">Revenue</CardTitle>
//       </CardHeader>
//       <CardContent className="h-full p-4"> {/* Adjusted padding */}
//         <ChartContainer config={chartConfig} className="h-[300px] w-full"> {/* Set a reasonable height */}
//           <LineChart
//             accessibilityLayer
//             data={data.length > 0 ? data : chartData}
//             margin={{
//               top: 20,
//               left: 12,
//               right: 12,
//               bottom: 10,
//             }}
//           >
//             <defs>
//               <linearGradient id="desktopGradient" x1="0" y1="0" x2="1" y2="0">
//                 <stop offset="0%" stopColor="#FF8126" />
//                 <stop offset="100%" stopColor="#FFAD1A" />
//               </linearGradient>
//             </defs>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               domain={[0, yAxisMax]}
//               interval="preserveStartEnd"
//               width={30}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<CustomTooltip />}
//             />
//             <Line
//               dataKey="desktop"
//               type="natural"
//               stroke="url(#desktopGradient)"
//               strokeWidth={4}
//               dot={<CustomDot />}
//               activeDot={{
//                 r: 10,
//                 fill: "#FF8126",
//                 stroke: "white",
//                 strokeWidth: 2,
//               }}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]





// src/components/Graph.jsx
"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

// Custom dot component with white center
const CustomDot = (props) => {
  const { cx, cy, stroke } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill={stroke} />
      <circle cx={cx} cy={cy} r={3} fill="white" />
    </g>
  );
};

// Custom tooltip content to position directly on the point
const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length) {
    const vendorValue = payload.find(p => p.dataKey === 'vendors')?.value || 0;
    const marketOwnerValue = payload.find(p => p.dataKey === 'marketOwners')?.value || 0;

    return (
      <div
        className="bg-[#FF8126] text-white p-2 rounded-md shadow-lg relative"
        style={{
          position: "absolute",
          left: coordinate.x - 50,
          top: coordinate.y - 40,
          width: "100px",
          textAlign: "center",
        }}
      >
        <span>Vendors: {vendorValue}</span>
        <br />
        <span>Market Owners: {marketOwnerValue}</span>
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid #FF8126",
          }}
        />
      </div>
    );
  }
  return null;
};

export function Graph({ data = [] }) {
  // Log the data to debug
  console.log('Graph Data:', data);

  const chartConfig = {
    vendors: {
      label: "Vendors",
      color: "url(#vendorGradient)",
    },
    marketOwners: {
      label: "Market Owners",
      color: "url(#marketOwnerGradient)",
    },
  };

  // Calculate the maximum value for the Y-axis
  const maxVendors = data.length > 0 ? Math.max(...data.map(item => item.vendors || 0)) : 0;
  const maxMarketOwners = data.length > 0 ? Math.max(...data.map(item => item.marketOwners || 0)) : 0;
  const maxValue = Math.max(maxVendors, maxMarketOwners, 10); // Ensure minimum of 10
  const yAxisMax = Math.ceil(maxValue / 5) * 5; // Round up to nearest 5 for tighter scaling

  // Default data if no data is provided
  const chartData = [
    { month: "January 2024", vendors: 0, marketOwners: 0 },
    { month: "February 2024", vendors: 0, marketOwners: 0 },
    { month: "March 2024", vendors: 0, marketOwners: 0 },
    { month: "April 2024", vendors: 0, marketOwners: 0 },
    { month: "May 2024", vendors: 0, marketOwners: 0 },
    { month: "June 2024", vendors: 0, marketOwners: 0 },
  ];

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-[#030229]">User Signups</CardTitle>
      </CardHeader>
      <CardContent className="h-full p-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={data.length > 0 ? data : chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="vendorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF8126" />
                <stop offset="100%" stopColor="#FFAD1A" />
              </linearGradient>
              <linearGradient id="marketOwnerGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5B93FF" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const [month, year] = value.split(' ');
                return `${month.slice(0, 3)} ${year.slice(2)}`; // e.g., "Jan 24"
              }}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, yAxisMax]}
              interval="preserveStartEnd"
              width={30}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-sm text-[#030229]">{value}</span>
              )}
            />
            <Line
              dataKey="vendors"
              name="Vendors"
              type="natural" // Use "natural" for the wavy feel
              stroke="url(#vendorGradient)"
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{
                r: 10,
                fill: "#FF8126",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
            <Line
              dataKey="marketOwners"
              name="Market Owners"
              type="natural" // Use "natural" for the wavy feel
              stroke="url(#marketOwnerGradient)"
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{
                r: 10,
                fill: "#5B93FF",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}