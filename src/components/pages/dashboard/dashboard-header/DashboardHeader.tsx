'use client';
import {headerUrls} from "@/components/pages/dashboard/dashboard-header/headerUrls";
import Link from "next/link";
import {usePathname} from "next/navigation";
import UVMetre from "@/components/pages/dashboard/dashboard-header/uv-metre/UVMetre";

const DashboardHeader = () => {
    const pathname = usePathname();
    return (
        <div className='border-b-1 flex gap-2 justify-between p-5 w-full items-center'>
            <div className='flex gap-2 h-10'>
                {Object.entries(headerUrls).map(([url, name]) =>
                    <Link
                        href={url}
                        key={url}
                        className={pathname.includes(url) ? "border-b-2 border-primary font-bold" : ""}
                    >
                        {name}
                    </Link>
                )}
            </div>
            <UVMetre/>
        </div>
    );
};
export default DashboardHeader;