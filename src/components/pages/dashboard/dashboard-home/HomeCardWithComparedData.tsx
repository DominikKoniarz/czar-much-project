"use client";

import { ChartConfig } from "@/components/ui/chart";
import CardWithChart from "@/components/shared/CardWithChart";

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
	data: {
		label: string;
		current: number;
		old: number;
	}[];
}

const HomeCardWithComparedData = ({
	title,
	currentDataColors,
	chartKey,
	data,
}: Props) => {
	return (
		<CardWithChart
			title={title}
			chartData={data}
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
