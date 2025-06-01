'use client'
import CardWithChart from "@/components/shared/CardWithChart";
import * as React from "react";
import {dummyData} from "@/components/pages/dashboard/dashboard-home/irr-metre/dummyData";
import {ChartConfig} from "@/components/ui/chart";

const chartConfig = {
    value: {
        label: "Predicted energy",
        color: "var(--primary)",
    },

} satisfies ChartConfig

const EnergyPrediction = () => {
    const parsedData = Object.entries(dummyData[1]).map(([time, value]) => ({
        time,
        value
    }))
    return <CardWithChart
        title='Energy prediction for tomorrow'
        chartData={parsedData}
        chartConfig={chartConfig}
        firstDataKey='value'
        chartKey='energy_prediction'
        unit='Wh/m²'
        chartColors={{
            first: ['var(--blue-500)', 'var(--blue-500)']
        }}
    />
}
export default EnergyPrediction;