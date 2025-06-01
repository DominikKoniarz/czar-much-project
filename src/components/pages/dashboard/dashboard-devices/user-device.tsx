"use client";

import {getUserDevices} from "@/lib/data-access/device";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useMemo} from "react";
import {PRICE_PER_KWH} from "@/constants/pricing";

import {useRouter} from "next/navigation";
import DeviceEnableButton from "@/components/pages/dashboard/dashboard-devices/DeviceEnableButton";


type Props = {
    device: Awaited<ReturnType<typeof getUserDevices>>[number];
};


export default function UserDevice({device}: Props) {
    const router = useRouter();

    const todayEnergyFlow = useMemo(() => device.measurements.reduce((total, measurement) => {
        return total + (measurement.hourEnergyFlowWh ?? 0);
    }, 0) / 1000, [device.measurements]);
    const money = useMemo(() => todayEnergyFlow * PRICE_PER_KWH, [todayEnergyFlow]);
    const minWh=200

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
					</span>{' '}kWh</span>
				
            </div>

            <div className="flex justify-between items-center px-2">
                <span>Cost</span>
                <span className=' font-bold'><span className="text-xl">{money?.toFixed(2) ?? '0.00'} </span>zł</span>
            </div>
            {minWh&& <div className="flex justify-between items-center px-2 gap-4 text-primary">
                <span>Enable above production</span>
                <span className=' font-bold'><span className="">{minWh?.toFixed(2) ?? '0.00'} </span>Wh 🌱</span>
            </div>}
            <div className='flex justify-end mt-2'>
                <DeviceEnableButton deviceId={device.id} isDeviceEnabled={device.enabled} disabled={minWh>0} />
            </div>
        </CardContent>

    </Card>
}
