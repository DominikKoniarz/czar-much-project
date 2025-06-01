"use client";

import { getUserDevices } from "@/lib/data-access/device";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { PRICE_PER_KWH } from "@/constants/pricing";
import { useRouter } from "next/navigation";
import DeviceEnableButton from "@/components/pages/dashboard/dashboard-devices/DeviceEnableButton";
import { cn } from "@/lib/utils";

type Props = {
    device: Awaited<ReturnType<typeof getUserDevices>>[number];
};

export default function UserDevice({ device }: Props) {
    const router = useRouter();

    const todayEnergyFlow = useMemo(
        () =>
            device.measurements.reduce((total, measurement) => {
                return total + (measurement.hourEnergyFlowWh ?? 0);
            }, 0) / 1000,
        [device.measurements],
    );

    const money = useMemo(
        () => todayEnergyFlow * PRICE_PER_KWH,
        [todayEnergyFlow],
    );

    return (
        <Card
            className="w-auto min-w-[260px] flex-shrink-0 cursor-pointer gap-2 border-2 bg-white py-4"
            onClick={() => router.push(`/dashboard/devices/${device.id}`)}
        >
            <CardHeader className="px-3">
                <div className="flex gap-2">
                    <div
                        className={cn(
                            "h-3 w-3 flex-shrink-0 animate-pulse rounded-full",
                            device.enabled ? "bg-green-500" : "bg-gray-400",
                        )}
                    />
                    <CardTitle className="text-xl">{device.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-start px-2">
                <div className="flex items-center justify-between gap-5 px-2">
                    <span>Total today</span>
                    <span className="font-bold">
                        <span className="text-xl">
                            {todayEnergyFlow?.toFixed(2) ?? "0.00"}
                        </span>{" "}
                        kWh
                    </span>
                </div>

                <div className="flex items-center justify-between px-2">
                    <span>Cost</span>
                    <span className="font-bold">
                        <span className="text-xl">
                            {money?.toFixed(2) ?? "0.00"}{" "}
                        </span>
                        zł
                    </span>
                </div>
                {device.enableOnlyAboveProductionKw > 0 && (
                    <div className="text-primary flex items-center justify-between gap-4 px-2">
                        <span>Enable above production</span>
                        <span className="font-bold">
                            <span className="">
                                {device.enableOnlyAboveProductionKw}{" "}
                            </span>
                            kW 🌱
                        </span>
                    </div>
                )}
                <div className="mt-auto flex justify-end">
                    <DeviceEnableButton
                        deviceId={device.id}
                        isDeviceEnabled={device.enabled}
                        disabled={device.enableOnlyAboveProductionKw > 0}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
