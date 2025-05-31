import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";
import * as React from "react";
import {ChartColors} from "@/types/chart";

interface Props {
    chartData: Record<string, number | string>[];
    chartConfig: ChartConfig;
    firstDataKey: string;
    secondDataKey?: string;
    chartColors: ChartColors;
    secondDotted?: boolean;
    chartKey: string
    title?: string;
    xAxisDataKey?: string;
}

const CardWithChart = ({
                           chartData,
                           chartConfig,
                           firstDataKey,
                           secondDataKey,
                           chartColors,
                           secondDotted,
                           chartKey,
                           title,
                           xAxisDataKey = 'time'
                       }: Props) => {

    const firstLineId = `line-${chartKey}-${firstDataKey}`;
    const secondLineId = `line-${chartKey}-${secondDataKey}`;
    return (
        <Card className="pt-0 flex-1 gap-0 p-0" key={chartKey}>
            {title && <CardHeader className='p-3'>
                <CardTitle className='whitespace-nowrap text-xl'>{title}</CardTitle>
            </CardHeader>}
            <CardContent className="px-2 sm:px-6 pt-2">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[200px] min-w-[300px]"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id={firstLineId} x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={chartColors.first[1]}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={chartColors.first[0]}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            {secondDataKey &&
                                <linearGradient id={secondLineId} x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={chartColors.second?.[1]}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={chartColors.second?.[0]}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>}
                        </defs>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey={xAxisDataKey}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => value}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey={firstDataKey}
                            type="monotone"
                            fill={`url(#${firstLineId})`}
                            stroke={chartColors.first[1]}
                            stackId="a"
                        />
                        {secondDataKey &&
                            <Area
                                dataKey={secondDataKey as string}
                                type="monotone"
                                fill={`url(#${secondLineId})`}
                                stroke={chartColors.second?.[1]}
                                strokeDasharray={secondDotted ? "3 3" : undefined}
                                stackId="b"
                            />
                        }
                        {secondDataKey && <ChartLegend content={<ChartLegendContent/>}/>}
                    </AreaChart>

                </ChartContainer>

            </CardContent>
        </Card>
    )
}
export default CardWithChart