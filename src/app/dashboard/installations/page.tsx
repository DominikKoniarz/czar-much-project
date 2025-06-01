import { getUserSolarInstallations } from "@/lib/data-access/installation";
import { getAuth } from "@/lib/data-access/session";
import { IInstallation } from "@/types/installations";
import InstallationCard from "@/components/pages/dashboard/dashboard-installations/InstallationCard";
import * as React from "react";

export default async function SolarInstallationsPage() {
    const session = await getAuth();

    const installations: IInstallation[] = await getUserSolarInstallations({
        userId: session?.user.id ?? "",
    });

    return (
        <div className="p-4">
            <p className="mb-6 text-2xl font-semibold opacity-60">
                Your Solar Installations
            </p>
            <div className="flex gap-10">
                {installations.map((installation) => (
                    <InstallationCard
                        key={installation.id}
                        data={installation}
                    />
                ))}
            </div>
        </div>
    );
}
