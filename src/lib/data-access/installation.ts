import "server-only";

import { prisma } from "../prisma";

export const getUserSolarInstallations = ({ userId }: { userId: string }) => {
    return prisma.solarInstallation.findMany({
        where: {
            userId,
        },
    });
};

export const getUserSolarInstallationById = ({
    userId,
    installationId,
}: {
    userId: string;
    installationId: string;
}) => {
    return prisma.solarInstallation.findFirst({
        where: {
            id: installationId,
            userId,
        },
        select: {
            id: true,
            name: true,
            totalPowerKw: true,
            panelCount: true,
            createdAt: true,
            updatedAt: true,
            production: {
                // current day
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lte: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            },
        },
    });
};

export const getSolarInstallationLastWeekProduction = ({
    installationId,
    userId,
}: {
    installationId: string;
    userId: string;
}) => {
    return prisma.solarInstallationProduction.findMany({
        where: {
            installation: {
                id: installationId,
                userId: userId,
            },
            // last 7 days
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
        },
        orderBy: {
            createdAt: "asc",
        },
        select: {
            id: true,
            hourIndex: true,
            producedEnergyKWh: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
