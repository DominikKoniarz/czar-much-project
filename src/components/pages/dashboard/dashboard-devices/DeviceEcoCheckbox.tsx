"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { setDeviceEnabledAboveProductionAction } from "@/actions/device";
import { actionError } from "@/lib/action-error";
import { LoaderCircle } from "lucide-react";

interface Props {
    deviceId: string;
    deviceMinPower: number;
}

const useDeviceEcoCheckbox = () => {
    const { execute, isPending } = useAction(
        setDeviceEnabledAboveProductionAction,
        {
            onError: (error) => {
                actionError(error).default();
            },
            onSuccess: () => {},
        },
    );

    return {
        execute,
        isPending,
    };
};

const DeviceEcoCheckbox = ({ deviceMinPower, deviceId }: Props) => {
    const [enabled, setEnabled] = useState(deviceMinPower > 0);
    const [minPower, setMinPower] = useState<number | null>(
        deviceMinPower ?? 0,
    );

    const { execute, isPending } = useDeviceEcoCheckbox();

    const handleSave = () => {
        const value = minPower === null || isNaN(minPower) ? 0 : minPower;
        setMinPower(value);

        if (value === 0) {
            setEnabled(false);
        }

        setTimeout(() => {
            execute({
                deviceId,
                enableOnlyAboveProductionKw: value,
            });
        }, 150);
    };

    const handleCheckbox = (checked: boolean) => {
        setEnabled(checked);

        if (!checked) {
            setMinPower(0);

            setTimeout(() => {
                execute({
                    deviceId,
                    enableOnlyAboveProductionKw: 0,
                });
            }, 150);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "" ? null : parseFloat(e.target.value);
        setMinPower(value === null ? null : isNaN(value) ? 0 : value);
    };

    return (
        <div className="flex items-center gap-2">
            <Checkbox checked={enabled} onCheckedChange={handleCheckbox} />
            <span className={cn(!enabled && "opacity-50")}>
                Enable only above production
            </span>
            <div className="flex items-center">
                <Input
                    type="number"
                    className={cn("ml-2 w-20", !enabled && "opacity-50")}
                    value={minPower ?? ""}
                    onChange={handleInput}
                    disabled={!enabled}
                    onBlur={handleSave}
                    min={0}
                    step={0.1}
                />
                <span className={cn("ml-1", !enabled && "opacity-50")}>
                    {" "}
                    kW
                </span>
                {isPending && (
                    <div className="ml-1.5 h-4.5 w-4.5">
                        <LoaderCircle className="h-full w-full animate-spin text-blue-500" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceEcoCheckbox;
