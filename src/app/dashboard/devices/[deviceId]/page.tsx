import {
	getUserDeviceById,
	getUserDeviceLastWeekMeasurements,
} from "@/lib/data-access/device";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";
import * as React from "react";
import DeviceCharts from "@/components/shared/DeviceCharts";
import { DeviceCartData } from "@/types/chart";
import DeviceEnableButton from "@/components/pages/dashboard/dashboard-devices/DeviceEnableButton";
import DeviceEcoCheckbox from "@/components/pages/dashboard/dashboard-devices/DeviceEcoCheckbox";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

type Props = {
	params: Promise<{ deviceId: string }>;
};

const aggregateTodayMeasurements = (
	device: Exclude<Awaited<ReturnType<typeof getUserDeviceById>>, null>
) => {
	const currentHour = dayjs().hour();
	const todayMeasurementsPerHourWh: (number | null)[] = [];

	for (let hourIndex = 0; hourIndex <= currentHour; hourIndex++) {
		const hourMeasurement = device.measurements.find(
			(measurement) => measurement.hourIndex === hourIndex
		);
		todayMeasurementsPerHourWh.push(hourMeasurement?.hourEnergyFlowWh ?? null);
	}
	const parsedData: DeviceCartData = todayMeasurementsPerHourWh.map(
		(measurement, i) => ({
			label: `${i}:00`,
			value: measurement ?? 0,
		})
	);
	return { todayMeasurementsPerHourWh: parsedData };
};

const aggregateLastWeekMeasurements = (
	measurements: Exclude<
		Awaited<ReturnType<typeof getUserDeviceLastWeekMeasurements>>,
		null
	>
) => {
	const everyDayMeasurements: DeviceCartData = Array.from(
		{ length: 7 },
		() => ({
			value: 0,
			label: "",
		})
	);

	const today = dayjs();

	everyDayMeasurements.forEach((measurement, index) => {
		const dayOffset = 6 - index; // 0 for today, 1 for yesterday, etc.
		const date = today.subtract(dayOffset, "day");

		measurement.label = date.format("dddd");

		const dailyMeasurements = measurements.filter(
			(m) =>
				dayjs(m.createdAt).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
		);

		dailyMeasurements.forEach((m) => {
			measurement.value += m.hourEnergyFlowWh ?? 0;
		});
	});

	return { everyDayMeasurements };
};

export default async function DeviceSinglePage({ params }: Props) {
	// session will be here bc layout checks
	const [{ deviceId }, session] = await Promise.all([params, getAuth()]);

	const [device, weekMeasurements] = await Promise.all([
		getUserDeviceById({
			userId: session?.user.id ?? "",
			deviceId,
		}),
		getUserDeviceLastWeekMeasurements({
			userId: session?.user.id ?? "",
			deviceId,
		}),
	]);

	if (!device) redirect("/dashboard/devices");

	const { todayMeasurementsPerHourWh } = aggregateTodayMeasurements(device);
	const { everyDayMeasurements } =
		aggregateLastWeekMeasurements(weekMeasurements);

	return (
		<main>
			<div className="bg-white p-6">
				<p className="text-2xl font-semibold opacity-60">Device information</p>
				<div className="space-y-1">
					<div>
						<span className="font-medium text-gray-700">Device Name:</span>
						<span className="ml-2 font-semibold text-gray-900">
							{device.name}
						</span>
					</div>
					<div>
						<span className="font-medium text-gray-700">Enabled:</span>
						<span
							className={cn(
								"ml-2 rounded px-2 py-1 text-sm",
								device.enabled
									? "bg-green-100 text-green-800"
									: "bg-red-100 text-red-800"
							)}
						>
							{device.enabled ? "Yes" : "No"}
						</span>
					</div>
					<DeviceEcoCheckbox
						deviceId={device.id}
						deviceMinPower={device.enableOnlyAboveProductionKw}
					/>
					{device.enableOnlyAboveProductionKw === 0 && (
						<DeviceEnableButton
							deviceId={device.id}
							isDeviceEnabled={device.enabled}
						/>
					)}

					<div className="mt-4">
						<DeviceCharts
							todayData={todayMeasurementsPerHourWh}
							weekData={everyDayMeasurements}
							weekTitle="Energy used last week"
							todayTitle="Energy used today"
							chartColors={["var(--destructive)", "var(--destructive-light)"]}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
