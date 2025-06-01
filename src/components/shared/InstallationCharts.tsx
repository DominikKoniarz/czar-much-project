"use client";

import CardWithChart from "@/components/shared/CardWithChart";
import { useMemo } from "react";
import { ChartConfig } from "@/components/ui/chart";

interface Props {
	todayData: Record<string, number | string>[];
	weekData: Record<string, number | string>[];
	todayTitle: string;
	weekTitle: string;
	chartColors: string[];
}

const InstallationCharts = ({
	todayData,
	weekData,
	weekTitle,
	todayTitle,
	chartColors,
}: Props) => {
	const todaysChartConfig = useMemo(
		() =>
			({
				value: {
					label: todayTitle,
					color: "var(--primary)",
				},
			} satisfies ChartConfig),
		[todayTitle]
	);

	const weekChartConfig = useMemo(
		() =>
			({
				value: {
					label: weekTitle,
					color: "var(--primary)",
				},
			} satisfies ChartConfig),
		[weekTitle]
	);

	return (
		<div className="flex flex-wrap gap-10">
			<CardWithChart
				title={todayTitle}
				chartData={todayData}
				chartConfig={todaysChartConfig}
				firstDataKey="value"
				xAxisDataKey="label"
				chartKey="device_today"
				unit={"kWh"}
				chartColors={{
					first: chartColors,
				}}
			/>
			<CardWithChart
				title={weekTitle}
				chartData={weekData.map((item) => ({
					label: item.label,
					value: item.value,
				}))}
				chartConfig={weekChartConfig}
				firstDataKey="value"
				xAxisDataKey="label"
				chartKey="device_today"
				unit={"kWh"}
				chartColors={{
					first: chartColors,
				}}
			/>
		</div>
	);
};
export default InstallationCharts;
