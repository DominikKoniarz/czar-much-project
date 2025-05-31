"use client";

import * as React from "react";
import { ChartConfig } from "@/components/ui/chart";
import CardWithChart from "@/components/shared/CardWithChart";

const chartData = [
    { time: "06:00", current: 10, old: 30 },
    { time: "07:00", current: 25, old: 35 },
    { time: "08:00", current: 50, old: 40 },
    { time: "09:00", current: 80, old: 45 },
    { time: "10:00", current: 120, old: 60 },
    { time: "11:00", current: 180, old: 80 },
    { time: "12:00", current: 220, old: 100 },
    { time: "13:00", current: 250, old: 120 },
    { time: "14:00", current: 260, old: 130 },
    { time: "15:00", current: 240, old: 125 },
    { time: "16:00", current: 200, old: 110 },
    { time: "17:00", current: 150, old: 100 },
    { time: "18:00", current: 90, old: 80 },
    { time: "19:00", current: 40, old: 60 },
    { time: "20:00", current: 15, old: 40 },
];

const chartConfig = {
    current: {
        label: "Current time period",
        color: "var(--primary)",
    },
    old: {
        label: "Previous time period ",
        color: "var(--destructive)",
    },
} satisfies ChartConfig;

interface Props {
    title?: string;
    currentDataColors: string[];
    chartKey: string;
}

const HomeCardWithComparedData = ({
    title,
    currentDataColors,
    chartKey,
}: Props) => {
    return (
        <CardWithChart
            title={title}
            chartData={chartData}
            chartConfig={chartConfig}
            firstDataKey="current"
            secondDataKey="old"
            chartKey={chartKey}
            chartColors={{
                first: currentDataColors,
                second: ["var(--muted-foreground)", "var(--muted-foreground)"],
            }}
            secondDotted
        />
    );
};
export default HomeCardWithComparedData;
