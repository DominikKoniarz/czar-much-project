'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React, {useMemo, useState} from "react";

interface Props {
    deviceId: string;
    deviceMinPower: number | undefined;
}

const DeviceEcoCheckbox = ({ deviceMinPower }: Props) => {
    const [enabled, setEnabled] = useState(!!deviceMinPower);
    const [minPower, setMinPower] = useState<number>(deviceMinPower ?? 0);
    const [originalMinPower] = useState<number>(deviceMinPower ?? 0);

    const isDisabled = deviceMinPower === undefined;

    const handleSave = () => {
        const value= minPower > 0 ? minPower : undefined;
        // tutaj logika zapisu
    };

    const handleCheckbox = (checked: boolean) => {
        setEnabled(checked);
        if (!checked) {
            setMinPower(0);
        }
        setTimeout(()=>handleSave(), 0);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPower(Number(e.target.value));
    };


    const showSave =useMemo(() =>
        enabled &&
        minPower !== originalMinPower &&
        minPower !== 0,
        [enabled, minPower, originalMinPower])

    return (
        <div className="flex items-center gap-2">
            <Checkbox
                checked={enabled}
                onCheckedChange={handleCheckbox}
            />
            <span className={isDisabled&&!enabled ? "opacity-50" : ""}>
                Enable only above production
            </span>
            <div className="flex items-center">
                <Input
                    type="number"
                    className={`w-20 ml-2 ${!enabled ? "opacity-50" : ""}`}
                    value={minPower}
                    onChange={handleInput}
                    disabled={!enabled}
                    min={0}
                />
                <span className={`ml-1 ${!enabled ? "opacity-50" : ""}`}>Wh</span>
                {showSave && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className="ml-2"
                        onClick={handleSave}
                    >
                        <Save className="w-4 h-4"  />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DeviceEcoCheckbox;