import {getUserDeviceById, getUserDeviceLastWeekMeasurements,} from "@/lib/data-access/device";
import {getAuth} from "@/lib/data-access/session";
import {redirect} from "next/navigation";
import * as React from "react";
import DeviceCharts from "@/components/pages/dashboard-devices/device-charts";

type Props = {
    params: Promise<{ deviceId: string }>;
};

const aggregateTodayMeasurements = (
    device: Exclude<Awaited<ReturnType<typeof getUserDeviceById>>, null>
) => {
    const todayMeasurementsPerHourWh: (number | null)[] = [];

    for (let hourIndex = 0; hourIndex < 24; hourIndex++) {
        const hourMeasurement = device.measurements.find(
            (measurement) => measurement.hourIndex === hourIndex
        );
        todayMeasurementsPerHourWh.push(
            hourMeasurement ? hourMeasurement.hourEnergyFlowWh : null
        );
    }
    const parsedData = todayMeasurementsPerHourWh.map((measurement, i) => ({
        label: `${i}:00`,
        value: measurement ?? 0
    }));
    return {todayMeasurementsPerHourWh: parsedData};
};

const aggregateLastWeekMeasurements = (
    measurements: Exclude<
        Awaited<ReturnType<typeof getUserDeviceLastWeekMeasurements>>,
        null
    >
) => {
    const everyDayMeasurements = Array.from({length: 7}, () => ({
        value: 0,
        label: "",
    }));

    const today = new Date();

    everyDayMeasurements.forEach((measurement, index) => {
        const dayOffset = 6 - index; // 0 for today, 1 for yesterday, etc.
        const date = new Date(today);
        date.setDate(today.getDate() - dayOffset);

        const dayLabel = date.toLocaleDateString("en-US", {
            weekday: "long",
        });

        measurement.label = dayLabel;

        const dailyMeasurements = measurements.filter(
            (m) => new Date(m.createdAt).toDateString() === date.toDateString()
        );

        dailyMeasurements.forEach((m) => {
            measurement.value += m.hourEnergyFlowWh ?? 0;
        });
    });

    return {everyDayMeasurements};
};

export default async function DeviceSinglePage({params}: Props) {
    // session will be here bc layout checks
    const [{deviceId}, session] = await Promise.all([params, getAuth()]);

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

    const {todayMeasurementsPerHourWh} = aggregateTodayMeasurements(device);
    const {everyDayMeasurements} =
        aggregateLastWeekMeasurements(weekMeasurements);
    return (
        <main>

            <div className="bg-white rounded-lg shadow p-6">
                <p className='text-2xl opacity-60 font-semibold'>Device information</p>
                <div className="space-y-3">
                    <div>
                        <span className="font-medium text-gray-700">Device Name:</span>
                        <span className="ml-2 text-gray-900 font-semibold">{device.name}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Enabled:</span>
                        <span
                            className={`ml-2 px-2 py-1 rounded text-sm ${
                                device.enabled
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
							{device.enabled ? "Yes" : "No"}
						</span>
                    </div>
                    <div>

                        <DeviceCharts
                            todayMeasurementsPerHourWh={todayMeasurementsPerHourWh}
                            everyDayMeasurements={everyDayMeasurements}/>
                        {/*<span className="font-medium text-gray-700">*/}
                        {/*	Measurements per Hour:*/}
                        {/*</span>*/}
                        {/*<ul className="mt-2 space-y-1 max-w-[400px]">*/}
                        {/*    {todayMeasurementsPerHourWh.map((measurement, index) => (*/}
                        {/*        <li*/}
                        {/*            key={index}*/}
                        {/*            className={cn(*/}
                        {/*                "p-2 rounded flex justify-between",*/}
                        {/*                measurement !== null*/}
                        {/*                    ? "bg-blue-100 text-blue-800"*/}
                        {/*                    : "bg-gray-200 text-gray-600"*/}
                        {/*            )}*/}
                        {/*        >*/}
                        {/*            <span>Hour {index}:</span>*/}
                        {/*            <span>*/}
                        {/*				{measurement !== null ? `${measurement} Wh` : "N/A"}*/}
                        {/*			</span>*/}
                        {/*        </li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
                        {/*/!* week measurements *!/*/}
                        {/*<h3 className="text-lg font-semibold mt-6">*/}
                        {/*    Last Week Measurements*/}
                        {/*</h3>*/}
                        {/*<ul className="mt-2 space-y-1 max-w-[400px]">*/}
                        {/*    {everyDayMeasurements.map((measurement, index) => (*/}
                        {/*        <li*/}
                        {/*            key={index}*/}
                        {/*            className={cn(*/}
                        {/*                "p-2 rounded flex justify-between",*/}
                        {/*                measurement.totalEnergyFlowWh > 0*/}
                        {/*                    ? "bg-blue-100 text-blue-800"*/}
                        {/*                    : "bg-gray-200 text-gray-600"*/}
                        {/*            )}*/}
                        {/*        >*/}
                        {/*            <span>{measurement.dayLabel}:</span>*/}
                        {/*            <span>*/}
                        {/*				{measurement.totalEnergyFlowWh > 0*/}
                        {/*                    ? `${measurement.totalEnergyFlowWh} Wh`*/}
                        {/*                    : "N/A"}*/}
                        {/*			</span>*/}
                        {/*        </li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </div>
        </main>
    );
}
