"use client";

import type { AggregatedDevicesMeasurementsData } from "@/lib/device/aggregate";
import type { AggregatedSolarInstallationsData } from "@/lib/installation/aggregate";
import HomeCardWithText from "@/components/pages/dashboard/dashboard-home/HomeCardWithText";
import HomeCardWithProdUse from "@/components/pages/dashboard/dashboard-home/HomeCardWithProdUse";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import HomeCardWithComparedData from "@/components/pages/dashboard/dashboard-home/HomeCardWithComparedData";
import HomeCardWithDeviceBars from "@/components/pages/dashboard/dashboard-home/HomeCardWithDeviceBars";

interface Props {
	devicesData: AggregatedDevicesMeasurementsData;
	solarsData: AggregatedSolarInstallationsData;
}

type SelectedOptionType = "today" | "week";

const DashboardHome = ({ solarsData, devicesData }: Props) => {
	const [selectedOption, setSelectedOption] =
		useState<SelectedOptionType>("today");

	const productionTotalValue = useMemo(
		() =>
			selectedOption === "today"
				? solarsData.today.totalCurrentDayProduction
				: solarsData.last7Days.total7DaysProduction,
		[selectedOption, solarsData]
	);

	const maxProductionValue = useMemo(
		() =>
			selectedOption === "today"
				? solarsData.today.maxCurrentDayHourProduction
				: solarsData.last7Days.maxDailyProduction,
		[selectedOption, solarsData]
	);

	const maxDevicesFlowValue = useMemo(
		() =>
			Number(
				(
					(selectedOption === "today"
						? devicesData.today.maxCurrentDayHourEnergyFlow
						: devicesData.last7Days.maxDailyEnergyFlowWh) / 1000
				).toFixed(2)
			),
		[selectedOption, devicesData]
	);

	const totalDevicesFlowValue = useMemo(
		() =>
			Number(
				(
					(selectedOption === "today"
						? devicesData.today.totalCurrentDayEnergyFlow
						: devicesData.last7Days.total7DaysEnergyFlowWh) / 1000
				).toFixed(2)
			),
		[selectedOption, devicesData]
	);

	const productionComparedData: {
		label: string;
		current: number;
		old: number;
	}[] = useMemo(() => {
		const returnData: {
			label: string;
			current: number;
			old: number;
		}[] = [];

		if (selectedOption === "today") {
			for (let i = 0; i < 24; i++) {
				const time = `${String(i).padStart(2, "0")}:00`;
				const current = (solarsData.today.hourlyProduction[i] || 0).toFixed(2);
				const old = (solarsData.yesterday.hourlyProduction[i] || 0).toFixed(2);

				returnData.push({
					label: time,
					current: Number(current),
					old: Number(old),
				});
			}
		} else {
			for (let i = 0; i < 7; i++) {
				const dayIndex = 6 - i; // to get the last 7 days in order
				const date = new Date();
				date.setDate(date.getDate() - dayIndex);
				const label = date.toLocaleDateString("en-US", { weekday: "short" });

				const current = (
					solarsData.last7Days.last7DaysProduction[i].totalProducedEnergyKWh ||
					0
				).toFixed(2);
				const old = (
					solarsData.weekBeforeLast.last7DaysProduction[i]
						.totalProducedEnergyKWh || 0
				).toFixed(2);

				returnData.push({
					label,
					current: Number(current),
					old: Number(old),
				});
			}
		}

		return returnData;
	}, [selectedOption, solarsData]);

	const devicesComparedData: {
		label: string;
		current: number;
		old: number;
	}[] = useMemo(() => {
		const returnData: {
			label: string;
			current: number;
			old: number;
		}[] = [];

		if (selectedOption === "today") {
			for (let i = 0; i < 24; i++) {
				const time = `${String(i).padStart(2, "0")}:00`;
				const current = (devicesData.today.hourlyEnergyFlowWh[i] || 0).toFixed(
					2
				);
				const old = (devicesData.yesterday.hourlyEnergyFlowWh[i] || 0).toFixed(
					2
				);

				returnData.push({
					label: time,
					current: Number(current),
					old: Number(old),
				});
			}
		} else {
			for (let i = 0; i < 7; i++) {
				const dayIndex = 6 - i; // to get the last 7 days in order
				const date = new Date();
				date.setDate(date.getDate() - dayIndex);
				const label = date.toLocaleDateString("en-US", { weekday: "short" });

				const current = (
					devicesData.last7Days.last7DaysEnergyFlow[i].totalEnergyFlowWh || 0
				).toFixed(2);
				const old = (
					devicesData.weekBeforeLast.last7DaysEnergyFlow[i].totalEnergyFlowWh ||
					0
				).toFixed(2);

				returnData.push({
					label,
					current: Number(current),
					old: Number(old),
				});
			}
		}

		return returnData;
	}, [selectedOption, devicesData]);

	return (
		<div className="flex flex-col gap-10">
			<div className="flex gap-5">
				<p className="text-2xl font-semibold opacity-60">Dashboard</p>
				<Select
					value={selectedOption}
					onValueChange={(v: SelectedOptionType) => setSelectedOption(v)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="today">Today</SelectItem>
						<SelectItem value="week">This week</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-wrap gap-10">
				<HomeCardWithText
					title="Production"
					currentValue={0.58}
					totalValue={productionTotalValue}
					maxValue={maxProductionValue}
					type="prod"
				/>
				<HomeCardWithText
					title="Usage"
					currentValue={0.12}
					totalValue={totalDevicesFlowValue}
					maxValue={maxDevicesFlowValue}
					type="use"
				/>
				<HomeCardWithProdUse
					solars={solarsData}
					devices={devicesData}
					selectedOption={selectedOption}
				/>
			</div>
			<div className="flex flex-wrap gap-10">
				<HomeCardWithComparedData
					data={productionComparedData}
					chartKey="comp_prod"
					title={"Production compared to previous time period"}
					currentDataColors={["var(--primary)", "var(--secondary)"]}
				/>
				<HomeCardWithComparedData
					data={devicesComparedData}
					chartKey="comp_use"
					title={"Usage compared to previous time period"}
					currentDataColors={["var(--destructive)", "var(--destructive-light)"]}
				/>
			</div>
			<HomeCardWithDeviceBars />
		</div>
	);
};
export default DashboardHome;
