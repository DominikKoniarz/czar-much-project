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
import HomeCardWithComparedData from "@/components/pages/dashboard/dashboard-home/HomeCardWithComparedData";
import HomeCardWithDeviceBars from "@/components/pages/dashboard/dashboard-home/HomeCardWithDeviceBars";

interface Props {
    data: unknown;
}

type SelectedOptionType = "today" | "week";

const DashboardHome = ({ data }: Props) => {
    const [selectedOption, setSelectedOption] =
        useState<SelectedOptionType>("today");
    console.log(data);
    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-5">
                <p className="text-2xl font-semibold opacity-60">Dashboard</p>
                <Select
                    value={selectedOption}
                    onValueChange={(v: SelectedOptionType) =>
                        setSelectedOption(v)
                    }
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
            <div className="flex flex-wrap gap-10">
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
            <div className="flex flex-wrap gap-10">
                <HomeCardWithComparedData
                    chartKey="comp_prod"
                    title={"Production compared to previous time period"}
                    currentDataColors={["var(--primary)", "var(--secondary)"]}
                />
                <HomeCardWithComparedData
                    chartKey="comp_use"
                    title={"Usage compared to previous time period"}
                    currentDataColors={[
                        "var(--destructive)",
                        "var(--destructive-light)",
                    ]}
                />
            </div>
            <HomeCardWithDeviceBars />
        </div>
    );
};
export default DashboardHome;
