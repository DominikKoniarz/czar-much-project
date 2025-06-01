import {
    getSolarInstallationLastWeekProduction,
    getUserSolarInstallationById,
} from "@/lib/data-access/installation";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";
import { DeviceCartData } from "@/types/chart";
import dayjs from "dayjs";
import DeviceCharts from "@/components/shared/DeviceCharts";
import EnergyPrediction from "@/components/shared/EnergyPrediction";

type Props = {
    params: Promise<{ installationId: string }>;
};

const aggregateDailyProduction = (
    installation: Awaited<ReturnType<typeof getUserSolarInstallationById>>,
) => {
    const dailyProduction: number[] = Array(24).fill(0);
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
            (p) => p.hourIndex === index,
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
    >,
) => {
    const weeklyProduction: ({
        totalProducedEnergyKWh: number;
    } | null)[] = Array(7).fill(null);

    weeklyProduction.forEach((_, index) => {
        const daysBack = 6 - index;
        const targetDate = new Date(
            Date.now() - daysBack * 24 * 60 * 60 * 1000,
        );
        const targetDateString = targetDate.toISOString().split("T")[0];

        const dayRecords = weeklyProductionData.filter((record) => {
            const recordDate = new Date(record.createdAt)
                .toISOString()
                .split("T")[0];
            return recordDate === targetDateString;
        });

        if (dayRecords.length > 0) {
            const totalProducedEnergyKWh = dayRecords.reduce(
                (sum, record) => sum + record.producedEnergyKWh,
                0,
            );
            weeklyProduction[index] = { totalProducedEnergyKWh };
        }
    });
    const parsedData: DeviceCartData = weeklyProduction.map(
        (measurement, i) => ({
            label: dayjs(
                new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
            ).format("ddd"),
            value: measurement?.totalProducedEnergyKWh ?? 0,
        }),
    );
    return { weeklyProduction: parsedData };
};

export default async function InstallationSinglePage({ params }: Props) {
    const [{ installationId }, session] = await Promise.all([
        params,
        getAuth(),
    ]);

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
    const { weeklyProduction } =
        aggregateWeeklyProduction(weeklyProductionData);

    return (
        <main className="p-4">
            <h1 className="mb-4 text-2xl font-bold">{installation.name}</h1>
            <div className="flex flex-wrap items-center gap-10">
                <DeviceCharts
                    weekData={weeklyProduction}
                    todayData={dailyProduction ?? []}
                    weekTitle="Energy produced last week"
                    todayTitle="Energy produced today"
                    chartColors={["var(--primary)", "var(--secondary)"]}
                    unit="kWh"
                />
                <EnergyPrediction />
            </div>
        </main>
    );
}
