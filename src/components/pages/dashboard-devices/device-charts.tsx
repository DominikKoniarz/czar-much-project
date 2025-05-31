'use client';
import CardWithChart from "@/components/shared/CardWithChart";
import * as React from "react";
import {ChartConfig} from "@/components/ui/chart";

interface Props {
    todayMeasurementsPerHourWh: Record<string, number | string>[];
    everyDayMeasurements: Record<string, number | string>[];
}

const todaysChartConfig = {
    value: {
        label: "Energy used today",
        color: "var(--primary)",
    },

} satisfies ChartConfig
const weekChartConfig = {
    value: {
        label: "Energy used this week",
        color: "var(--primary)",
    },

} satisfies ChartConfig
const DeviceCharts = ({todayMeasurementsPerHourWh, everyDayMeasurements}: Props) => {
    return <div className='flex gap-10 flex-wrap'>
        <CardWithChart
            title='Energy used today'
            chartData={todayMeasurementsPerHourWh}
            chartConfig={todaysChartConfig}
            firstDataKey='value'
            xAxisDataKey='label'
            chartKey='device_today'
            chartColors={{
                first: ['var(--destructive)', 'var(--destructive-light)'],
            }}
        />
        <CardWithChart
            title='Energy used this week'
            chartData={everyDayMeasurements}
            chartConfig={weekChartConfig}
            firstDataKey='value'
            xAxisDataKey='label'
            chartKey='device_today'
            chartColors={{
                first: ['var(--destructive)', 'var(--destructive-light)'],
            }}
        />
    </div>
}
export default DeviceCharts;