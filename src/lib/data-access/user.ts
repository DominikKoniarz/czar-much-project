import "server-only";

import { prisma } from "../prisma";

export const getUserByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};
