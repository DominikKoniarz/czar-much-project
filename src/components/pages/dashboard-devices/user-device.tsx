"use client";

import {toggleDeviceAction} from "@/actions/device";
import {actionError} from "@/lib/action-error";
import {getUserDevices} from "@/lib/data-access/device";
import {useAction} from "next-safe-action/hooks";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useMemo} from "react";
import {PRICE_PER_KWH} from "@/constants/pricing";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

type Props = {
    device: Awaited<ReturnType<typeof getUserDevices>>[number];
};

const useUserDevice = () => {

    const {execute, isExecuting} = useAction(toggleDeviceAction, {
        onError: (error) => {
            actionError(error).default();
        },
    });

    return {
        execute,
        isExecuting,
    };
};

export default function UserDevice({device}: Props) {
    const router = useRouter();
    const {execute, isExecuting} = useUserDevice();

    const todayEnergyFlow = useMemo(() => device.measurements.reduce((total, measurement) => {
        return total + (measurement.hourEnergyFlowWh ?? 0);
    }, 0), [device.measurements]);
    const money = useMemo(() => todayEnergyFlow / 1000 * PRICE_PER_KWH, [todayEnergyFlow]);
    // return (
    // 	<div className="p-4 border-b">
    // 		<h2 className="text-lg font-semibold">{device.name}</h2>
    // 		<p className="text-sm text-gray-600">
    // 			Total Energy Today:{" "}
    // 			<span className="font-semibold">{todayEnergyFlow} Wh</span>
    // 		</p>
    // 		<p className="text-sm text-gray-600">
    // 			Enabled:{" "}
    // 			{device.enabled ? (
    // 				<span className="text-green-500">Yes</span>
    // 			) : (
    // 				<span className="text-red-500">No</span>
    // 			)}
    // 		</p>
    // 		<Link
    // 			href={`/dashboard/devices/${device.id}`}
    // 			className="mt-2 px-4 py-2 rounded bg-blue-500 text-white"
    // 		>
    // 			Inspect Device
    // 		</Link>
    //
    // 		<button
    // 			onClick={() => execute({ deviceId: device.id })}
    // 			disabled={isExecuting}
    // 			className={cn(
    // 				"mt-2 px-4 cursor-pointer py-2 rounded  text-white",
    // 				device.enabled ? "bg-red-500" : "bg-green-500"
    // 			)}
    // 		>
    // 			{device.enabled ? "Disable" : "Enable"} Device
    // 		</button>
    // 		{isExecuting && (
    // 			<div className="mt-2 text-sm text-gray-500">
    // 				<span>Processing...</span>
    // 			</div>
    // 		)}
    // 	</div>
    // );
    return <Card className='border-2 bg-white gap-2 py-4 min-w-[260px] w-auto flex-shrink-0 cursor-pointer'
                 onClick={() => router.push(`/dashboard/devices/${device.id}`)}>
        <CardHeader className='px-3 '>
            <div className='flex  gap-2'>
                <div
                    className={`w-3 h-3 rounded-full ${device.enabled ? "bg-green-500" : "bg-gray-400"} animate-pulse flex-shrink-0`}/>
                <CardTitle className=' text-xl '>{device.name}</CardTitle>
            </div>


        </CardHeader>
        <CardContent className='px-2 flex flex-col justify-end flex-1'>
            <div className="flex justify-between items-center px-2 gap-5">
                <span>Total today</span>
                <span className='font-bold'>
					<span className="text-xl">
						{todayEnergyFlow?.toFixed(2) ?? '0.00'}
					</span>
					Wh</span>
            </div>

            <div className="flex justify-between items-center px-2">
                <span>Cost</span>
                <span className=' font-bold'><span className="text-xl">{money?.toFixed(2) ?? '0.00'} </span>zł</span>
            </div>
            <div className='flex justify-end mt-2'>
                <Button
                    onClick={e => {
                        e.stopPropagation();
                        execute({deviceId: device.id});
                    }}
                    disabled={isExecuting}
                    className={cn(
                        "mt-2 px-4 cursor-pointer py-2 rounded text-white",
                        device.enabled
                            ? "bg-destructive hover:bg-destructive/80"
                            : "bg-primary hover:bg-primary/80"
                    )}
                >{device.enabled ? "Disable" : "Enable"}</Button>
            </div>
        </CardContent>

    </Card>
}
