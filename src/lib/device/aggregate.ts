import { getAllDevicesLast14DaysMeasurements } from "../data-access/device";
import dayjs from "dayjs";

export type AggregatedDevicesMeasurementsData = {
    today: {
        totalCurrentDayEnergyFlow: number;
        maxCurrentDayHourEnergyFlow: number;
        hourlyEnergyFlowWh: number[];
    };
    yesterday: {
        totalYesterdayEnergyFlow: number;
        maxYesterdayHourEnergyFlow: number;
        hourlyEnergyFlowWh: number[];
    };
    last7Days: {
        last7DaysEnergyFlow: {
            dayOfWeek: string;
            totalEnergyFlowWh: number;
        }[];
        total7DaysEnergyFlowWh: number;
        maxDailyEnergyFlowWh: number;
    };
    weekBeforeLast: {
        last7DaysEnergyFlow: {
            dayOfWeek: string;
            totalEnergyFlowWh: number;
        }[];
        total7DaysEnergyFlowWh: number;
        maxDailyEnergyFlowWh: number;
    };
};

export const aggregateDevicesMeasurementsDataForHome = (
    data: Awaited<ReturnType<typeof getAllDevicesLast14DaysMeasurements>>,
): AggregatedDevicesMeasurementsData => {
    const today = dayjs();
    const yesterday = today.subtract(1, "day");
    const last7DaysStart = today.subtract(7, "day");

    const todayEnergyFlow = data.filter((item) =>
        dayjs(item.createdAt).isSame(today, "day"),
    );

    const yesterdayEnergyFlow = data.filter((item) =>
        dayjs(item.createdAt).isSame(yesterday, "day"),
    );

    const last7DaysEnergyFlow = data.filter(
        (item) =>
            dayjs(item.createdAt).isAfter(last7DaysStart) ||
            dayjs(item.createdAt).isSame(last7DaysStart, "day"),
    );

    const weekBeforeLastEnergyFlow = data.filter((item) =>
        dayjs(item.createdAt).isBefore(last7DaysStart, "day"),
    );

    const returnData: AggregatedDevicesMeasurementsData = {
        today: {
            totalCurrentDayEnergyFlow: 0,
            maxCurrentDayHourEnergyFlow: 0,
            hourlyEnergyFlowWh: [],
        },
        yesterday: {
            totalYesterdayEnergyFlow: 0,
            maxYesterdayHourEnergyFlow: 0,
            hourlyEnergyFlowWh: [],
        },
        last7Days: {
            last7DaysEnergyFlow: [],
            total7DaysEnergyFlowWh: 0,
            maxDailyEnergyFlowWh: 0,
        },
        weekBeforeLast: {
            last7DaysEnergyFlow: [],
            total7DaysEnergyFlowWh: 0,
            maxDailyEnergyFlowWh: 0,
        },
    };

    // fill hours values for today
    for (let index = 0; index < 24; index++) {
        const hourData = todayEnergyFlow.find((item) => {
            return item.hourIndex === index;
        });

        if (hourData) {
            returnData.today.hourlyEnergyFlowWh.push(hourData.hourEnergyFlowWh);
        } else {
            returnData.today.hourlyEnergyFlowWh.push(0);
        }
    }
    // fill max hour energy flow for today
    returnData.today.maxCurrentDayHourEnergyFlow = Math.max(
        ...returnData.today.hourlyEnergyFlowWh,
    );
    // fill total energy flow for today
    returnData.today.totalCurrentDayEnergyFlow = Number(
        returnData.today.hourlyEnergyFlowWh
            .reduce((acc, hour) => acc + hour, 0)
            .toFixed(2),
    );

    // fill hours values for yesterday
    for (let index = 0; index < 24; index++) {
        const hourData = yesterdayEnergyFlow.find((item) => {
            return item.hourIndex === index;
        });

        if (hourData) {
            returnData.yesterday.hourlyEnergyFlowWh.push(
                hourData.hourEnergyFlowWh,
            );
        } else {
            returnData.yesterday.hourlyEnergyFlowWh.push(0);
        }
    }
    // fill max hour energy flow for yesterday
    returnData.yesterday.maxYesterdayHourEnergyFlow = Math.max(
        ...returnData.yesterday.hourlyEnergyFlowWh,
    );
    // fill total energy flow for yesterday
    returnData.yesterday.totalYesterdayEnergyFlow = Number(
        returnData.yesterday.hourlyEnergyFlowWh
            .reduce((acc, hour) => acc + hour, 0)
            .toFixed(2),
    );

    // fill last 7 days energy flow
    for (let i = 6; i >= 0; i--) {
        const targetDate = today.subtract(i, "day");

        const allDayData = last7DaysEnergyFlow.filter((item) => {
            return dayjs(item.createdAt).isSame(targetDate, "day");
        });

        const totalProducedEnergyKWh = allDayData.reduce(
            (acc, item) => acc + item.hourEnergyFlowWh,
            0,
        );

        const dayOfWeek = targetDate.format("dddd");

        returnData.last7Days.last7DaysEnergyFlow.push({
            dayOfWeek,
            totalEnergyFlowWh: Number(totalProducedEnergyKWh.toFixed(2)),
        });
    }
    // fill total energy flow for last 7 days
    returnData.last7Days.total7DaysEnergyFlowWh = Number(
        returnData.last7Days.last7DaysEnergyFlow
            .reduce((acc, item) => acc + item.totalEnergyFlowWh, 0)
            .toFixed(2),
    );
    // fill max daily energy flow for last 7 days
    returnData.last7Days.maxDailyEnergyFlowWh = Math.max(
        ...returnData.last7Days.last7DaysEnergyFlow.map(
            (item) => item.totalEnergyFlowWh,
        ),
    );

    // fill week before last 7 days energy flow
    for (let i = 6; i >= 0; i--) {
        const targetDate = today.subtract(i + 7, "day");

        const allDayData = weekBeforeLastEnergyFlow.filter((item) => {
            return dayjs(item.createdAt).isSame(targetDate, "day");
        });

        const totalProducedEnergyKWh = allDayData.reduce(
            (acc, item) => acc + item.hourEnergyFlowWh,
            0,
        );

        const dayOfWeek = targetDate.format("dddd");

        returnData.weekBeforeLast.last7DaysEnergyFlow.push({
            dayOfWeek,
            totalEnergyFlowWh: Number(totalProducedEnergyKWh.toFixed(2)),
        });
    }
    // fill total energy flow for week before last 7 days
    returnData.weekBeforeLast.total7DaysEnergyFlowWh = Number(
        returnData.weekBeforeLast.last7DaysEnergyFlow
            .reduce((acc, item) => acc + item.totalEnergyFlowWh, 0)
            .toFixed(2),
    );
    // fill max daily energy flow for week before last 7 days
    returnData.weekBeforeLast.maxDailyEnergyFlowWh = Math.max(
        ...returnData.weekBeforeLast.last7DaysEnergyFlow.map(
            (item) => item.totalEnergyFlowWh,
        ),
    );

    return returnData;
};
