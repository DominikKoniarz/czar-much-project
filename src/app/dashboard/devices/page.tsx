import UserDevice from "@/components/pages/dashboard/dashboard-devices/user-device";
import {getUserDevices} from "@/lib/data-access/device";
import {getAuth} from "@/lib/data-access/session";
import * as React from "react";

export default async function DevicesPage() {
    // session will be here bc layout checks
    const session = await getAuth();

    const userDevices = await getUserDevices({
        userId: session?.user.id ?? "",
    });

    return (
        <div className=" p-4">
            <p className='text-2xl opacity-60 font-semibold mb-6'>Your devices</p>
            <div className="flex gap-10">
                {userDevices.map((device) => (
                    <UserDevice key={device.id} device={device}/>
                ))}
            </div>

        </div>
    );
}
