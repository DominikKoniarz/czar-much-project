import { getAllInstallationsLast2WeeksProduction } from "../data-access/installation";
import dayjs from "dayjs";

export type AggregatedSolarInstallationsData = {
    today: {
        totalCurrentDayProduction: number;
        maxCurrentDayHourProduction: number;
        hourlyProduction: number[];
    };
    yesterday: {
        totalYesterdayProduction: number;
        maxYesterdayHourProduction: number;
        hourlyProduction: number[];
    };
    last7Days: {
        last7DaysProduction: {
            dayOfWeek: string;
            totalProducedEnergyKWh: number;
        }[];
        total7DaysProduction: number;
        maxDailyProduction: number;
    };
    weekBeforeLast: {
        last7DaysProduction: {
            dayOfWeek: string;
            totalProducedEnergyKWh: number;
        }[];
        total7DaysProduction: number;
        maxDailyProduction: number;
    };
};

export const aggregateSolarInstallationsDataForHome = (
    data: Awaited<ReturnType<typeof getAllInstallationsLast2WeeksProduction>>,
): AggregatedSolarInstallationsData => {
    const today = dayjs();
    const yesterday = today.subtract(1, "day");

    const todayProduction = data.filter(
        (item) => dayjs(item.createdAt).date() === today.date(),
    );

    const yesterdayProduction = data.filter(
        (item) => dayjs(item.createdAt).date() === yesterday.date(),
    );

    const last7DaysProduction = data.filter((item) =>
        dayjs(item.createdAt).isAfter(today.subtract(7, "day")),
    );

    const weekBeforeLastProduction = data.filter((item) =>
        dayjs(item.createdAt).isBefore(today.subtract(7, "day")),
    );

    const returnData: AggregatedSolarInstallationsData = {
        today: {
            totalCurrentDayProduction: 0,
            maxCurrentDayHourProduction: 0,
            hourlyProduction: [],
        },
        yesterday: {
            totalYesterdayProduction: 0,
            maxYesterdayHourProduction: 0,
            hourlyProduction: [],
        },
        last7Days: {
            last7DaysProduction: [],
            total7DaysProduction: 0,
            maxDailyProduction: 0,
        },
        weekBeforeLast: {
            last7DaysProduction: [],
            total7DaysProduction: 0,
            maxDailyProduction: 0,
        },
    };

    // fill hours values for today
    for (let index = 0; index < 24; index++) {
        const hourData = todayProduction.find((item) => {
            return item.hourIndex === index;
        });

        if (hourData) {
            returnData.today.hourlyProduction.push(hourData.producedEnergyKWh);
        } else {
            returnData.today.hourlyProduction.push(0);
        }
    }
    // fill max hour production for today
    returnData.today.maxCurrentDayHourProduction = Math.max(
        ...returnData.today.hourlyProduction,
    );
    // fill total production for today
    returnData.today.totalCurrentDayProduction = Number(
        returnData.today.hourlyProduction
            .reduce((acc, hour) => acc + hour, 0)
            .toFixed(2),
    );

    // fill hours values for yesterday
    for (let index = 0; index < 24; index++) {
        const hourData = yesterdayProduction.find((item) => {
            return item.hourIndex === index;
        });

        if (hourData) {
            returnData.yesterday.hourlyProduction.push(
                hourData.producedEnergyKWh,
            );
        } else {
            returnData.yesterday.hourlyProduction.push(0);
        }
    }
    // fill max hour production for yesterday
    returnData.yesterday.maxYesterdayHourProduction = Math.max(
        ...returnData.yesterday.hourlyProduction,
    );
    // fill total production for yesterday
    returnData.yesterday.totalYesterdayProduction = Number(
        returnData.yesterday.hourlyProduction
            .reduce((acc, hour) => acc + hour, 0)
            .toFixed(2),
    );

    // fill last 7 days production
    for (let i = 6; i >= 0; i--) {
        const targetDate = today.subtract(i, "day");

        const allDayData = last7DaysProduction.filter((item) => {
            const itemDate = dayjs(item.createdAt);
            return targetDate.isSame(itemDate, "day");
        });

        const totalProducedEnergyKWh = allDayData.reduce(
            (acc, item) => acc + item.producedEnergyKWh,
            0,
        );

        const dayOfWeek = targetDate.format("dddd");

        returnData.last7Days.last7DaysProduction.push({
            dayOfWeek,
            totalProducedEnergyKWh: Number(totalProducedEnergyKWh.toFixed(2)),
        });
    }
    // fill total production for last 7 days
    returnData.last7Days.total7DaysProduction = Number(
        returnData.last7Days.last7DaysProduction
            .reduce((acc, item) => acc + item.totalProducedEnergyKWh, 0)
            .toFixed(2),
    );
    // fill max daily production for last 7 days
    returnData.last7Days.maxDailyProduction = Math.max(
        ...returnData.last7Days.last7DaysProduction.map(
            (item) => item.totalProducedEnergyKWh,
        ),
    );

    // fill week before last 7 days production
    for (let i = 6; i >= 0; i--) {
        const targetDate = today.subtract(i + 9, "day");

        const allDayData = weekBeforeLastProduction.filter((item) => {
            const itemDate = dayjs(item.createdAt);
            return targetDate.isSame(itemDate, "day");
        });

        const totalProducedEnergyKWh = allDayData.reduce(
            (acc, item) => acc + item.producedEnergyKWh,
            0,
        );

        const dayOfWeek = targetDate.format("dddd");

        returnData.weekBeforeLast.last7DaysProduction.push({
            dayOfWeek,
            totalProducedEnergyKWh: Number(totalProducedEnergyKWh.toFixed(2)),
        });
    }
    // fill total production for week before last 7 days
    returnData.weekBeforeLast.total7DaysProduction = Number(
        returnData.weekBeforeLast.last7DaysProduction
            .reduce((acc, item) => acc + item.totalProducedEnergyKWh, 0)
            .toFixed(2),
    );
    // fill max daily production for week before last 7 days
    returnData.weekBeforeLast.maxDailyProduction = Math.max(
        ...returnData.weekBeforeLast.last7DaysProduction.map(
            (item) => item.totalProducedEnergyKWh,
        ),
    );

    return returnData;
};
