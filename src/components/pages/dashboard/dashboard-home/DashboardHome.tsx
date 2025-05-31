"use client";

import HomeCardWithText from "@/components/pages/dashboard/dashboard-home/HomeCardWithText";
import HomeCardWithProdUse from "@/components/pages/dashboard/dashboard-home/HomeCardWithProdUse";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Props {
	data: unknown;
}

type SelectedOptionType = "today" | "week";

const DashboardHome = ({ data }: Props) => {
	const [selectedOption, setSelectedOption] =
		useState<SelectedOptionType>("today");
	console.log("DashboardHome data", data);
	return (
		<div className="flex gap-2 flex-col ">
			<div className="flex gap-5">
				<p className="text-2xl opacity-60 font-semibold">Dashboard</p>
				<Select
					value={selectedOption}
					onValueChange={(v: SelectedOptionType) => setSelectedOption(v)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="today">Today</SelectItem>
						<SelectItem value="week">This week</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex gap-10 flex-wrap">
				<HomeCardWithText
					title="Production"
					currentValue={0.58}
					totalValue={11.2}
					type="prod"
					maxValue={2.11}
				/>
				<HomeCardWithText
					title="Usage"
					currentValue={0.12}
					totalValue={11.22}
					maxValue={4.11}
					type="use"
				/>
				<HomeCardWithProdUse />
			</div>
		</div>
	);
};
export default DashboardHome;
