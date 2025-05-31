"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { time: "06:00", production: 10, use: 30 },
    { time: "07:00", production: 25, use: 35 },
    { time: "08:00", production: 50, use: 40 },
    { time: "09:00", production: 80, use: 45 },
    { time: "10:00", production: 120, use: 60 },
    { time: "11:00", production: 180, use: 80 },
    { time: "12:00", production: 220, use: 100 },
    { time: "13:00", production: 250, use: 120 },
    { time: "14:00", production: 260, use: 130 },
    { time: "15:00", production: 240, use: 125 },
    { time: "16:00", production: 200, use: 110 },
    { time: "17:00", production: 150, use: 100 },
    { time: "18:00", production: 90, use: 80 },
    { time: "19:00", production: 40, use: 60 },
    { time: "20:00", production: 15, use: 40 },
];

const chartConfig = {
    production: {
        label: "Production",
        color: "var(--primary)",
    },
    use: {
        label: "Usage",
        color: "var(--destructive)",
    },
} satisfies ChartConfig;

const HomeCardWithProdUse = () => {
    return (
        <Card className="flex-1 gap-0 p-0 pt-0">
            <CardContent className="px-2 pt-2 sm:px-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[200px] min-w-[300px]"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient
                                id="fillProduction"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--secondary)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--primary)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillUse"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--destructive-light)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--destructive)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => value}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="production"
                            type="monotone"
                            fill="url(#fillProduction)"
                            stroke="var(--secondary)"
                            stackId="a"
                        />
                        <Area
                            dataKey="use"
                            type="monotone"
                            fill="url(#fillUse)"
                            stroke="var(--destructive-light)"
                            stackId="b"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
export default HomeCardWithProdUse;
