import { useEffect, useState } from "react";
import dummyResponse from "@/components/pages/dashboard/dashboard-header/uv-metre/dummyResponse";
import dayjs from "dayjs";
import Image from "next/image";

interface IUVData {
    currentUV: string;
    maxUV: string;
    maxUVTime: string;
}

const UVMetre = () => {
    const [UVData, setUVData] = useState<IUVData | null>(null);

    useEffect(() => {
        const setUVDataFromResponse = (response: {
            result: {
                uv: number;
                uv_max: number;
                uv_max_time: string;
            };
        }) => {
            setUVData({
                currentUV: response.result.uv.toString(),
                maxUV: response.result.uv_max.toString(),
                maxUVTime: response.result.uv_max_time,
            });
        };

        const fetchUV = async (lat: string, lng: string, alt: string) => {
            const url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}&alt=${alt}&dt=`;
            try {
                const myHeaders = new Headers();
                myHeaders.append("x-access-token", "openuv-c4fkrmbc8hv0t-io");
                const res = await fetch(url, {
                    method: "GET",
                    headers: myHeaders,
                });
                if (!res.ok) {
                    throw new Error("API error");
                }
                const data = await res.json();
                setUVDataFromResponse(data);
            } catch (error) {
                console.log(error);
                setUVDataFromResponse(dummyResponse);
            }
        };

        if (window.location.hostname.includes("localhost")) {
            setUVDataFromResponse(dummyResponse);
        } else {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    fetchUV(
                        pos.coords.latitude.toFixed(2),
                        pos.coords.longitude.toFixed(2),
                        "200",
                    );
                },
                () => setUVDataFromResponse(dummyResponse),
            );
        }
    }, []);

    return (
        <div className="hidden gap-2 rounded-2xl border-2 border-blue-400 bg-blue-100 p-2 text-sm sm:flex">
            <Image src="/sun.png" width={22} height={22} alt="" priority />
            {UVData && (
                <>
                    <div>
                        Cur UV: <b>{Number(UVData.currentUV).toFixed(2)}</b>
                    </div>
                    <div>
                        Max UV: <b>{Number(UVData.maxUV).toFixed(2)}</b> at{" "}
                        <b>{dayjs(UVData.maxUVTime).format("HH:mm")}</b>
                    </div>
                </>
            )}
        </div>
    );
};

export default UVMetre;
