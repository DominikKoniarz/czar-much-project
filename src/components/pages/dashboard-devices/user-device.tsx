"use client";

import { toggleDeviceAction } from "@/actions/device";
import { actionError } from "@/lib/action-error";
import { getUserDevices } from "@/lib/data-access/device";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";

type Props = {
	device: Awaited<ReturnType<typeof getUserDevices>>[number];
};

const useUserDevice = () => {
	const { execute, isExecuting } = useAction(toggleDeviceAction, {
		onError: (error) => {
			actionError(error).default();
		},
	});

	return {
		execute,
		isExecuting,
	};
};

export default function UserDevice({ device }: Props) {
	const { execute, isExecuting } = useUserDevice();

	const todayEnergyFlow = device.measurements.reduce((total, measurement) => {
		return total + (measurement.hourEnergyFlowWh ?? 0);
	}, 0);

	return (
		<div className="p-4 border-b">
			<h2 className="text-lg font-semibold">{device.name}</h2>
			<p className="text-sm text-gray-600">
				Total Energy Today:{" "}
				<span className="font-semibold">{todayEnergyFlow} Wh</span>
			</p>
			<p className="text-sm text-gray-600">
				Enabled:{" "}
				{device.enabled ? (
					<span className="text-green-500">Yes</span>
				) : (
					<span className="text-red-500">No</span>
				)}
			</p>
			<Link
				href={`/dashboard/devices/${device.id}`}
				className="mt-2 px-4 py-2 rounded bg-blue-500 text-white"
			>
				Inspect Device
			</Link>

			<button
				onClick={() => execute({ deviceId: device.id })}
				disabled={isExecuting}
				className={cn(
					"mt-2 px-4 cursor-pointer py-2 rounded  text-white",
					device.enabled ? "bg-red-500" : "bg-green-500"
				)}
			>
				{device.enabled ? "Disable" : "Enable"} Device
			</button>
			{isExecuting && (
				<div className="mt-2 text-sm text-gray-500">
					<span>Processing...</span>
				</div>
			)}
		</div>
	);
}
