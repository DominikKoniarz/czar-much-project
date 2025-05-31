"use client";
import { headerUrls } from "@/components/pages/dashboard/dashboard-header/headerUrls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UVMetre from "@/components/pages/dashboard/dashboard-header/uv-metre/UVMetre";
import SavingsCounter from "@/components/pages/dashboard/dashboard-header/savings-counter/SavingsCounter";
import Image from "next/image";

const DashboardHeader = () => {
    const pathname = usePathname();
    return (
        <header className="flex w-full flex-wrap items-center justify-between gap-2 border-b-1 p-5">
            <div className="flex items-center gap-8">
                <Image src="/logo.svg" width={80} height={80} alt="ddd" />
                <div className="flex h-8 gap-8">
                    {Object.entries(headerUrls).map(([url, name]) => (
                        <Link
                            href={url}
                            key={url}
                            className={`text-xl ${pathname.includes(url) ? "border-primary border-b-2 font-bold" : ""}`}
                        >
                            {name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex gap-2">
                <SavingsCounter type="saved" />
                <SavingsCounter type="spent" />
                <UVMetre />
            </div>
        </header>
    );
};
export default DashboardHeader;
