"use client"

import * as React from "react"
import {ChartConfig,} from "@/components/ui/chart"
import CardWithChart from "@/components/shared/CardWithChart";


const chartData = [
    {time: "06:00", production: 10, use: 30},
    {time: "07:00", production: 25, use: 35},
    {time: "08:00", production: 50, use: 40},
    {time: "09:00", production: 80, use: 45},
    {time: "10:00", production: 120, use: 60},
    {time: "11:00", production: 180, use: 80},
    {time: "12:00", production: 220, use: 100},
    {time: "13:00", production: 250, use: 120},
    {time: "14:00", production: 260, use: 130},
    {time: "15:00", production: 240, use: 125},
    {time: "16:00", production: 200, use: 110},
    {time: "17:00", production: 150, use: 100},
    {time: "18:00", production: 90, use: 80},
    {time: "19:00", production: 40, use: 60},
    {time: "20:00", production: 15, use: 40},
]

const chartConfig = {
    production: {
        label: "Production",
        color: "var(--primary)",
    },
    use: {
        label: "Usage",
        color: "var(--destructive)",
    },
} satisfies ChartConfig

const HomeCardWithProdUse = () => {

    return <CardWithChart
        chartData={chartData}
        chartConfig={chartConfig}
        firstDataKey='production'
        secondDataKey='use'
        chartKey='prod_use'
        chartColors={{
            first: ['var(--primary)', 'var(--secondary)'],
            second: ['var(--destructive)', 'var(--destructive-light)']
        }}/>
}
export default HomeCardWithProdUse;