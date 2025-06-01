"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
	deviceId: string;
	deviceMinPower: number | undefined;
}

const DeviceEcoCheckbox = ({ deviceMinPower }: Props) => {
	const [enabled, setEnabled] = useState(!!deviceMinPower);
	const [minPower, setMinPower] = useState<number>(deviceMinPower ?? 0);

	const isDisabled = deviceMinPower === undefined;

	const handleSave = () => {
		const value = minPower > 0 ? minPower : undefined;
		if (!enabled || value === undefined) return;
		console.log("saving value:", value);
		// tutaj logika zapisu
	};

	const handleCheckbox = (checked: boolean) => {
		setEnabled(checked);
		if (!checked) {
			setMinPower(0);
			setTimeout(() => handleSave(), 0);
		}
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMinPower(Number(e.target.value));
	};

	return (
		<div className="flex items-center gap-2">
			<Checkbox checked={enabled} onCheckedChange={handleCheckbox} />
			<span className={cn(isDisabled && !enabled && "opacity-50")}>
				Enable only above production
			</span>
			<div className="flex items-center">
				<Input
					type="number"
					className={cn("w-20 ml-2", !enabled && "opacity-50")}
					value={minPower}
					onChange={handleInput}
					disabled={!enabled}
					onBlur={handleSave}
					min={0}
				/>
				<span className={cn("ml-1", !enabled && "opacity-50")}>Wh</span>
			</div>
		</div>
	);
};

export default DeviceEcoCheckbox;
