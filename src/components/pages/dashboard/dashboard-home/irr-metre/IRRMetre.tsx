import {useEffect, useState} from "react";
import Image from "next/image";
import {dummyData} from "@/components/pages/dashboard/dashboard-home/irr-metre/dummyData";
import dayjs from "dayjs";

interface IIRRData {
    currentIRR: string;
    maxIRR: string;
    maxIRRTime: string;
}

const IRRMetre = () => {
    const [IRRData, setIRRData] = useState<IIRRData | null>(null);

    useEffect(() => {
        const maxIRR = Math.max(...Object.values(dummyData[0]));
        let maxIRRTime = ''
        Object.entries(dummyData[0]).forEach(([time, value]) => {
            if (value === maxIRR) {
                maxIRRTime = time;
            }
        })

        const currentHour = dayjs().hour()
        const hourStr = currentHour < 10 ? `0${currentHour}` : `${currentHour}`;
        // @ts-expect-error-next-line
        const currentIRR = dummyData[0][`${hourStr}:00`]?.toString() ?? '0';

        setIRRData({currentIRR, maxIRR: maxIRR.toString(), maxIRRTime});
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                // const lat = pos.coords.latitude.toFixed(2);
                // const long = pos.coords.longitude.toFixed(2);
                // const azimuth = 180
                // const declination = 35
                // const system_loss = 14
                //
                // const res = await fetch(`https://api.forecast.solar/estimate/${lat}/${long}/${declination}/${azimuth}/${system_loss}`)
                // console.log(res)
                // const data = await res.json();
                // console.log(data)
            },
        );

    }, []);

    return (
        <div className="rounded-2xl border-2 border-blue-400 bg-blue-100 p-2   gap-2 text-sm hidden sm:flex">
            <Image src="/sun.png" width={22} height={22} alt="" priority/>
            {IRRData && (
                <>
                    <div>
                        Current solar irradiation: <b>{Number(IRRData.currentIRR)} Wh</b>
                    </div>
                    <div>
                        Max solar irradiation: <b>{Number(IRRData.maxIRR)} Wh</b> at{" "}
                        <b>{IRRData.maxIRRTime}</b>
                    </div>
                </>
            )}
        </div>
    );
};

export default IRRMetre;
