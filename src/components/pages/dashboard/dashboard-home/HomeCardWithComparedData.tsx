"use client";

import { ChartConfig } from "@/components/ui/chart";
import CardWithChart from "@/components/shared/CardWithChart";
import { SelectedOptionType } from "@/components/pages/dashboard/dashboard-home/DashboardHome";
import { useMemo } from "react";

interface Props {
    title?: string;
    currentDataColors: string[];
    chartKey: string;
    data: {
        label: string;
        current: number;
        old: number;
    }[];
    selectedPeriod: SelectedOptionType;
}

const HomeCardWithComparedData = ({
    title,
    currentDataColors,
    chartKey,
    data,
    selectedPeriod,
}: Props) => {
    const timePeriodLabel = useMemo(
        () => (selectedPeriod === "today" ? "day" : "week"),
        [selectedPeriod],
    );

    const chartConfig = useMemo(
        () =>
            ({
                current: {
                    label: `Current ${timePeriodLabel}`,
                    color: "var(--primary)",
                },
                old: {
                    label: `Previous ${timePeriodLabel} `,
                    color: "var(--destructive)",
                },
            }) satisfies ChartConfig,
        [timePeriodLabel],
    );

    const parsedTitle = useMemo(
        () => title?.replace("time period", timePeriodLabel) ?? "",
        [title, timePeriodLabel],
    );

    return (
        <CardWithChart
            title={parsedTitle}
            chartData={data}
            chartConfig={chartConfig}
            firstDataKey="current"
            secondDataKey="old"
            xAxisDataKey="label"
            unit="kWh"
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
