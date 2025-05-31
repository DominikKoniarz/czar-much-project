"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
    { device: "Pralka", value: 1.2 },
    { device: "Lodówka", value: 0.8 },
    { device: "Zmywarka", value: 0.5 },
    { device: "Piekarnik", value: 2.1 },
    { device: "Suszarka", value: 0.67 },
    { device: "Klimatyzacja", value: 1.56 },
];

const chartConfig = {
    value: {
        label: "Usage",
        color: "var(--destructive)",
    },
} satisfies ChartConfig;

export const HomeCardWithDeviceBars = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl whitespace-nowrap">
                    Devices using most power
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[200px] min-w-[300px]"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 15, right: 0, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="device"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <Bar
                            dataKey="value"
                            fill="var(--destructive-light)"
                            radius={8}
                        >
                            <LabelList
                                dataKey="value"
                                position="top"
                                formatter={(value: number) => `${value} kWh`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
export default HomeCardWithDeviceBars;
