import "server-only";

import { prisma } from "../prisma";

export const getUserDevices = ({ userId }: { userId: string }) => {
    return prisma.device.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            enabled: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            enableOnlyAboveProductionKw: true,
            measurements: {
                select: {
                    id: true,
                    hourEnergyFlowWh: true,
                    hourIndex: true,
                },
                where: {
                    // today from 00:00 to 23:59
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            },
        },
    });
};

export const getUserDeviceById = ({
    userId,
    deviceId,
}: {
    userId: string;
    deviceId: string;
}) => {
    return prisma.device.findFirst({
        where: {
            id: deviceId,
            userId: userId,
        },
        select: {
            id: true,
            name: true,
            enabled: true,
            enableOnlyAboveProductionKw: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            measurements: {
                select: {
                    id: true,
                    hourEnergyFlowWh: true,
                    hourIndex: true,
                },
                where: {
                    // today from 00:00 to 23:59
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            },
        },
    });
};

export const getUserDeviceLastWeekMeasurements = ({
    userId,
    deviceId,
}: {
    userId: string;
    deviceId: string;
}) => {
    return prisma.deviceMeasurement.findMany({
        where: {
            device: {
                id: deviceId,
                userId: userId,
            },
            // last 7 days from today
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
        },
        select: {
            id: true,
            hourEnergyFlowWh: true,
            hourIndex: true,
            createdAt: true,
        },
    });
};

export const toggleUserDevice = async ({
    deviceId,
    userId,
    enabled,
}: {
    deviceId: string;
    userId: string;
    enabled: boolean;
}) => {
    return prisma.device.update({
        where: {
            id: deviceId,
            userId: userId,
        },
        data: {
            enabled: enabled,
        },
    });
};

export const setDeviceEnabledAboveProduction = async ({
    deviceId,
    userId,
    enableOnlyAboveProductionKw,
}: {
    deviceId: string;
    userId: string;
    enableOnlyAboveProductionKw: number;
}) => {
    return prisma.device.update({
        where: {
            id: deviceId,
            userId: userId,
        },
        data: {
            enabled: enableOnlyAboveProductionKw > 0,
            enableOnlyAboveProductionKw: enableOnlyAboveProductionKw,
        },
    });
};

export const getAllDevicesLast14DaysMeasurements = ({
    userId,
}: {
    userId: string;
}) => {
    return prisma.deviceMeasurement.findMany({
        where: {
            device: {
                userId: userId,
            },
            // last 14 days from today
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 14)),
                lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
        },
        orderBy: {
            createdAt: "asc",
        },
        select: {
            id: true,
            hourEnergyFlowWh: true,
            hourIndex: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export type DeviceWithMostPower = {
    id: string;
    name: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    sumEnergyFlowWh: number;
};

export const getDevicesUsingMostPowerToday = async ({
    userId,
}: {
    userId: string;
}): Promise<DeviceWithMostPower[]> => {
    const rawData = await prisma.device.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            measurements: {
                _count: "desc",
            },
        },
        take: 6, // Limit to top 6 devices
        select: {
            id: true,
            name: true,
            enabled: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            measurements: {
                select: {
                    id: true,
                    hourEnergyFlowWh: true,
                    hourIndex: true,
                    createdAt: true,
                },
                where: {
                    // today from 00:00 to 23:59
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            },
        },
    });

    return rawData.map((device) => {
        const sumEnergyFlowWh = device.measurements.reduce(
            (acc, measurement) => acc + measurement.hourEnergyFlowWh,
            0,
        );

        return {
            id: device.id,
            name: device.name,
            enabled: device.enabled,
            createdAt: device.createdAt,
            updatedAt: device.updatedAt,
            sumEnergyFlowWh: sumEnergyFlowWh,
        };
    });
};

export const getDevicesUsingMostPowerThisWeek = async ({
    userId,
}: {
    userId: string;
}): Promise<DeviceWithMostPower[]> => {
    const rawData = await prisma.device.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            measurements: {
                _count: "desc",
            },
        },
        take: 6, // Limit to top 6 devices
        select: {
            id: true,
            name: true,
            enabled: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            measurements: {
                select: {
                    id: true,
                    hourEnergyFlowWh: true,
                    hourIndex: true,
                    createdAt: true,
                },
                where: {
                    // last 7 days from today
                    createdAt: {
                        gte: new Date(
                            new Date().setDate(new Date().getDate() - 7),
                        ),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            },
        },
    });

    return rawData.map((device) => {
        const sumEnergyFlowWh = device.measurements.reduce(
            (acc, measurement) => acc + measurement.hourEnergyFlowWh,
            0,
        );

        return {
            id: device.id,
            name: device.name,
            enabled: device.enabled,
            createdAt: device.createdAt,
            updatedAt: device.updatedAt,
            sumEnergyFlowWh: sumEnergyFlowWh,
        };
    });
};
