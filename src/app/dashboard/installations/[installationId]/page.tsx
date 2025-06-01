import {
	getSolarInstallationLastWeekProduction,
	getUserSolarInstallationById,
} from "@/lib/data-access/installation";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";
import { DeviceCartData } from "@/types/chart";
import dayjs from "dayjs";
import EnergyPrediction from "@/components/shared/EnergyPrediction";
import InstallationCharts from "@/components/shared/InstallationCharts";

type Props = {
	params: Promise<{ installationId: string }>;
};
const aggregateDailyProduction = (
	installation: Awaited<ReturnType<typeof getUserSolarInstallationById>>
) => {
	const currentHour = dayjs().hour();
	const dailyProduction: number[] = Array(currentHour + 1).fill(0);

	const mapper = (data: number[]) =>
		data.map((measurement, i) => ({
			label: `${i}:00`,
			value: measurement ?? 0,
		}));

	if (!installation) {
		return { dailyProduction: mapper(dailyProduction) };
	}

	dailyProduction.forEach((_, index) => {
		const production = installation.production.find(
			(p) => p.hourIndex === index
		);
		if (production) {
			dailyProduction[index] = production.producedEnergyKWh;
		}
	});

	return { dailyProduction: mapper(dailyProduction) };
};

const aggregateWeeklyProduction = (
	weeklyProductionData: Awaited<
		ReturnType<typeof getSolarInstallationLastWeekProduction>
	>
) => {
	const weeklyProduction: ({
		totalProducedEnergyKWh: number;
	} | null)[] = Array(7).fill(null);

	const today = dayjs();

	weeklyProduction.forEach((_, index) => {
		const daysBack = 6 - index;
		const targetDate = today.subtract(daysBack, "day");
		const targetDateString = targetDate.format("YYYY-MM-DD");

		// Include all days before today and today up to current hour
		if (targetDate.isBefore(today, "day") || targetDate.isSame(today, "day")) {
			const dayRecords = weeklyProductionData.filter((record) => {
				const recordDate = dayjs(record.createdAt).format("YYYY-MM-DD");
				const recordHour = dayjs(record.createdAt).hour();

				if (recordDate === targetDateString) {
					// For today, only include hours before or equal to current hour
					if (targetDate.isSame(today, "day")) {
						return recordHour <= today.hour();
					}
					// For past days, include all hours
					return true;
				}
				return false;
			});

			if (dayRecords.length > 0) {
				const totalProducedEnergyKWh = dayRecords.reduce(
					(sum, record) => sum + record.producedEnergyKWh,
					0
				);
				weeklyProduction[index] = { totalProducedEnergyKWh };
			}
		}
	});

	const parsedData: DeviceCartData = weeklyProduction.map((measurement, i) => {
		const targetDate = today.subtract(6 - i, "day");
		return {
			label: targetDate.format("ddd"),
			value:
				targetDate.isBefore(today, "day") || targetDate.isSame(today, "day")
					? measurement?.totalProducedEnergyKWh ?? 0
					: 0,
		};
	});

	return { weeklyProduction: parsedData };
};

export default async function InstallationSinglePage({ params }: Props) {
	const [{ installationId }, session] = await Promise.all([params, getAuth()]);

	const [installation, weeklyProductionData] = await Promise.all([
		getUserSolarInstallationById({
			userId: session?.user.id ?? "",
			installationId,
		}),
		getSolarInstallationLastWeekProduction({
			installationId,
			userId: session?.user.id ?? "",
		}),
	]);

	if (!installation) redirect("/dashboard/installations");

	const { dailyProduction } = aggregateDailyProduction(installation);
	const { weeklyProduction } = aggregateWeeklyProduction(weeklyProductionData);

	return (
		<main className="p-4">
			<h1 className="mb-4 text-2xl font-bold">{installation.name}</h1>
			<div className="flex flex-wrap items-center gap-10">
				<InstallationCharts
					weekData={weeklyProduction}
					todayData={dailyProduction ?? []}
					weekTitle="Energy produced last week"
					todayTitle="Energy produced today"
					chartColors={["var(--primary)", "var(--secondary)"]}
				/>
				<EnergyPrediction />
			</div>
		</main>
	);
}
