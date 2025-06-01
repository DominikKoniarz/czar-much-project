"use client";
import CardWithChart from "@/components/shared/CardWithChart";
import * as React from "react";
import { dummyData } from "@/components/pages/dashboard/dashboard-home/irr-metre/dummyData";
import { ChartConfig } from "@/components/ui/chart";
import { useMemo } from "react";
import dayjs from "dayjs";

interface Props {
    selectedPeriod?: "today" | "week";
}
const EnergyPrediction = ({ selectedPeriod }: Props) => {
    const parsedData = useMemo(() => {
        if (selectedPeriod === "week") {
            return dummyData.slice(1, 7).map((dayData, idx) => {
                const value = Object.values(dayData).reduce(
                    (acc, v) => acc + v,
                    0,
                );
                const date = dayjs().add(idx + 1, "day");
                return {
                    time: date.format("ddd"),
                    value,
                };
            });
        } else {
            return Object.entries(dummyData[1]).map(([time, value]) => ({
                time,
                value,
            }));
        }
    }, [selectedPeriod]);
    const timePeriodLabel = useMemo(
        () => (selectedPeriod === "today" ? "tomorrow" : "upcoming week"),
        [selectedPeriod],
    );

    const chartConfig = useMemo(
        () =>
            ({
                value: {
                    label: `Predicted energy for ${timePeriodLabel}`,
                    color: "var(--primary)",
                },
            }) satisfies ChartConfig,
        [timePeriodLabel],
    );

    const originalTitle = "Energy prediction for tomorrow";
    const parsedTitle = useMemo(
        () =>
            selectedPeriod
                ? (originalTitle.replace("tomorrow", timePeriodLabel) ?? "")
                : originalTitle,
        [selectedPeriod, timePeriodLabel],
    );

    return (
        <CardWithChart
            title={parsedTitle}
            chartData={parsedData}
            chartConfig={chartConfig}
            firstDataKey="value"
            chartKey="energy_prediction"
            unit="Wh/m²"
            chartColors={{
                first: ["var(--color-chart-2)", "var(--color-chart-2)"],
            }}
            fullH
        />
    );
};
export default EnergyPrediction;
