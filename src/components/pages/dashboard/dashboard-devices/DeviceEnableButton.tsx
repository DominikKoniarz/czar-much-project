'use client'
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import useUserDevice from "@/hooks/useUserDevice";

interface Props{
    deviceId:string;
    isDeviceEnabled:boolean;
}
const DeviceEnableButton=({deviceId,isDeviceEnabled}:Props)=>{
    const {execute, isExecuting} = useUserDevice();

    return  <Button
    onClick={e => {
        e.stopPropagation();
        execute({deviceId});
    }}
    disabled={isExecuting}
    className={cn(
        "mt-2 px-4 cursor-pointer py-2 rounded text-white",
        isDeviceEnabled
            ? "bg-destructive hover:bg-destructive/80"
            : "bg-primary hover:bg-primary/80"
    )}
    >{isDeviceEnabled ? "Disable" : "Enable"}</Button>
}
export default DeviceEnableButton;