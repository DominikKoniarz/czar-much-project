"use client";

import { headerUrls } from "@/components/pages/dashboard/dashboard-header/headerUrls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SavingsCounter from "@/components/pages/dashboard/dashboard-header/savings-counter/SavingsCounter";
import Image from "next/image";
import { cn } from "@/lib/utils";
import LogOutButton from "./log-out-button/log-out-button";
import Calculator from "@/components/pages/dashboard/dashboard-header/calculator/Calculator";

const DashboardHeader = () => {
	const pathname = usePathname();

	return (
		<header className="flex w-full flex-wrap items-center justify-between gap-2 border-b-1 p-5">
			<div className="flex items-center gap-8">
				<Link href='/'><Image src="/logo.svg" width={80} height={80} alt="ddd" /></Link>
				<div className="flex h-8 gap-8">
					{Object.entries(headerUrls).map(([url, name]) => (
						<Link
							href={url}
							key={url}
							className={cn(
								"text-xl",
								pathname.includes(url) && "border-primary border-b-2 font-bold"
							)}
						>
							{name}
						</Link>
					))}
				</div>
			</div>

			<div className="flex gap-2">
				<SavingsCounter type="saved" />
				<SavingsCounter type="spent" />
				<Calculator/>
				<LogOutButton />
			</div>
		</header>
	);
};
export default DashboardHeader;
