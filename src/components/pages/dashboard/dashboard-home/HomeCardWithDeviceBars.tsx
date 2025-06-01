"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
	value: {
		label: "Usage",
		color: "var(--destructive)",
	},
} satisfies ChartConfig;

type Props = {
	chartData: {
		device: string;
		valueWh: number;
	}[];
};

export const HomeCardWithDeviceBars = ({ chartData }: Props) => {
	return (
		<Card className="flex-1">
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
						<Bar dataKey="valueWh" fill="var(--destructive-light)" radius={8}>
							<LabelList
								dataKey="valueWh"
								position="top"
								formatter={(value: number) => `${value} Wh`}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
export default HomeCardWithDeviceBars;
