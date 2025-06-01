"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useUserDevice from "@/hooks/useUserDevice";

interface Props {
	deviceId: string;
	isDeviceEnabled: boolean;
	disabled?: boolean;
}

const DeviceEnableButton = ({ deviceId, isDeviceEnabled, disabled }: Props) => {
	const { execute, isExecuting } = useUserDevice();

	const calculatedDisabled = isExecuting || disabled;

	return (
		<Button
			onClick={(e) => {
				e.stopPropagation();

				if (calculatedDisabled) return;

				execute({ deviceId });
			}}
			disabled={calculatedDisabled}
			className={cn(
				"mt-2 px-4 cursor-pointer py-2 rounded text-white",
				isDeviceEnabled
					? "bg-destructive hover:bg-destructive/80"
					: "bg-primary hover:bg-primary/80",
				// Tak wiem patologia z invisible, ale działa xDD
				disabled && "invisible"
			)}
		>
			{isDeviceEnabled ? "Disable" : "Enable"}
		</Button>
	);
};
export default DeviceEnableButton;
