"use client";

import type { AggregatedSolarInstallationsData } from "@/lib/installation/aggregate";
import type { AggregatedDevicesMeasurementsData } from "@/lib/device/aggregate";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

type Props = {
	solars: AggregatedSolarInstallationsData;
	devices: AggregatedDevicesMeasurementsData;
	selectedOption: "today" | "week";
};

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

const HomeCardWithProdUse = ({ solars, devices, selectedOption }: Props) => {
	const chartData = useMemo(() => {
		const data: {
			label: string;
			production: string;
			use: string;
		}[] = [];

		if (selectedOption === "today") {
			for (let i = 0; i < 24; i++) {
				const time = `${String(i).padStart(2, "0")}:00`;
				const production = (solars.today.hourlyProduction[i] || 0).toFixed(2);
				const use = (
					devices.today.hourlyEnergyFlowWh[i]
						? devices.today.hourlyEnergyFlowWh[i] / 1000 // Convert Wh to kWh
						: 0
				).toFixed(2);

				data.push({ label: time, production, use });
			}
		} else {
			for (let i = 0; i < 7; i++) {
				const date = new Date();
				date.setDate(date.getDate() - i);
				const label = date.toLocaleDateString("en-US", {
					weekday: "short",
					month: "short",
					day: "numeric",
				});
				const production = (
					solars.last7Days.last7DaysProduction[i]?.totalProducedEnergyKWh || 0
				).toFixed(2);
				const use = (
					devices.last7Days.last7DaysEnergyFlow[i]
						? devices.last7Days.last7DaysEnergyFlow[i].totalEnergyFlowWh / 1000 // Convert Wh to kWh
						: 0
				).toFixed(2);

				data.push({ label, production, use });
			}
		}

		return data;
	}, [solars, devices, selectedOption]);

	return (
		<Card className="flex-1 gap-0 p-0 pt-0">
			<CardContent className="px-2 pt-2 sm:px-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[200px] min-w-[300px]"
				>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id="fillProduction" x1="0" y1="0" x2="0" y2="1">
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
							<linearGradient id="fillUse" x1="0" y1="0" x2="0" y2="1">
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
							dataKey="label"
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
