import DashboardHome from "@/components/pages/dashboard/dashboard-home/DashboardHome";
import { getAllDevicesLast14DaysMeasurements } from "@/lib/data-access/device";
import { getAllInstallationsLast2WeeksProduction } from "@/lib/data-access/installation";
import { getAuth } from "@/lib/data-access/session";
import { aggregateDevicesMeasurementsDataForHome } from "@/lib/device/aggregate";
import { aggregateSolarInstallationsDataForHome } from "@/lib/installation/aggregate";

const DashboardPage = async () => {
	const session = await getAuth();

	const [last14DaysProductionData, last14DaysDevicesMeasurementsData] =
		await Promise.all([
			getAllInstallationsLast2WeeksProduction({
				userId: session?.user.id ?? "",
			}),
			getAllDevicesLast14DaysMeasurements({
				userId: session?.user.id ?? "",
			}),
		]);

	const aggregatedInstallationsData = aggregateSolarInstallationsDataForHome(
		last14DaysProductionData
	);
	const aggregatedDevicesData = aggregateDevicesMeasurementsDataForHome(
		last14DaysDevicesMeasurementsData
	);

	return (
		<div className="flex flex-col gap-10 p-5">
			<DashboardHome
				solarsData={aggregatedInstallationsData}
				devicesData={aggregatedDevicesData}
			/>
		</div>
	);
};
export default DashboardPage;
