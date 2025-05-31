import {
	getSolarInstallationLastWeekProduction,
	getUserSolarInstallationById,
} from "@/lib/data-access/installation";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";

type Props = {
	params: Promise<{ installationId: string }>;
};

const aggregateDailyProduction = (
	installation: Awaited<ReturnType<typeof getUserSolarInstallationById>>
) => {
	const dailyProduction: (number | null)[] = Array(24).fill(null);

	if (!installation) {
		return { dailyProduction };
	}

	dailyProduction.forEach((_, index) => {
		const production = installation.production.find(
			(p) => p.hourIndex === index
		);
		if (production) {
			dailyProduction[index] = production.producedEnergyKWh;
		}
	});

	return { dailyProduction };
};

const aggregateWeeklyProduction = (
	weeklyProductionData: Awaited<
		ReturnType<typeof getSolarInstallationLastWeekProduction>
	>
) => {
	const weeklyProduction: ({
		totalProducedEnergyKWh: number;
	} | null)[] = Array(7).fill(null);

	weeklyProduction.forEach((_, index) => {
		const daysBack = 6 - index;
		const targetDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
		const targetDateString = targetDate.toISOString().split("T")[0];

		const dayRecords = weeklyProductionData.filter((record) => {
			const recordDate = new Date(record.createdAt).toISOString().split("T")[0];
			return recordDate === targetDateString;
		});

		if (dayRecords.length > 0) {
			const totalProducedEnergyKWh = dayRecords.reduce(
				(sum, record) => sum + record.producedEnergyKWh,
				0
			);
			weeklyProduction[index] = { totalProducedEnergyKWh };
		}
	});

	return { weeklyProduction };
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
			<h1 className="text-2xl font-bold mb-4">{installation.name}</h1>
			<div className="mt-6"></div>
			<h2 className="text-xl font-semibold mb-3">Today production</h2>
			<ul className="space-y-2">
				{dailyProduction.map((prod, index) => (
					<li key={`daily-${index}`} className="flex justify-between">
						<span>Hour {index}:00</span>
						<span>{prod !== null ? `${prod.toFixed(2)} kWh` : "No data"}</span>
					</li>
				))}
			</ul>
			<br />
			<h2 className="text-xl font-semibold mb-3">Last week production</h2>
			<ul className="space-y-2">
				{weeklyProduction.map((prod, index) => (
					<li key={`weekly-${index}`} className="flex justify-between">
						<span>
							{new Date(
								Date.now() - (6 - index) * 24 * 60 * 60 * 1000
							).toLocaleDateString()}
						</span>
						<span>
							{prod !== null
								? `${prod.totalProducedEnergyKWh.toFixed(2)} kWh`
								: "No data"}
						</span>
					</li>
				))}
			</ul>
		</main>
	);
}
