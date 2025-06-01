"use client";

import type { AggregatedSolarInstallationsData } from "@/lib/installation/aggregate";
import type { AggregatedDevicesMeasurementsData } from "@/lib/device/aggregate";

import {
	ChartConfig
} from "@/components/ui/chart";
import { useMemo } from "react";
import CardWithChart from "@/components/shared/CardWithChart";
import dayjs from "dayjs";

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
				const label = dayjs(date).format("ddd");
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

	return <CardWithChart
		chartData={chartData}
		chartConfig={chartConfig}
		firstDataKey="production"
		secondDataKey="use"
		unit='kWh'
		chartKey={'prod_use'}
		xAxisDataKey='label'
		chartColors={{
			first: ["var(--primary)", "var(--secondary)"],
			second: ["var(--destructive)", "var(--destructive-light)"],
		}}
	/>
};
export default HomeCardWithProdUse;
