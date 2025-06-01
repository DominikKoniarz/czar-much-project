"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { IInstallation } from "@/types/installations";

interface Props {
	data: IInstallation;
}

// <div
//     key={installation.id}
//     className="p-4 border rounded-lg shadow-sm"
// >
//     <h2 className="text-xl font-semibold">{installation.name}</h2>
//     <p>Total Power: {installation.totalPowerKw} kW</p>
//     <p>Panels Count: {installation.panelCount}</p>
//     <p>
//         Created At:{" "}
//         {new Date(installation.createdAt).toLocaleDateString()}
//     </p>
//     <Link
//         href={`/dashboard/installations/${installation.id}`}
//         className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//     >
//         Inspect
//     </Link>
// </div>
const InstallationCard = ({ data }: Props) => {
	const router = useRouter();

	return (
		<Card
			className="w-[250px] flex-shrink-0 cursor-pointer gap-2 border-2 bg-white py-4"
			onClick={() => router.push(`/dashboard/installations/${data.id}`)}
		>
			<CardHeader className="px-3">
				<div className="flex gap-2">
					<div
						className={`h-3 w-3 flex-shrink-0 animate-pulse rounded-full bg-green-500`}
					/>
					<CardTitle className="text-xl">{data.name}</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col justify-end px-2">
				<div className="flex items-center justify-between gap-5 px-2">
					<span>Max power</span>
					<span className="font-bold">
						<span className="text-xl">
							{data.totalPowerKw?.toFixed(2) ?? "0.00"}
						</span>
						kW
					</span>
				</div>
				<div className="flex items-center justify-between gap-5 px-2">
					<span>Panels count</span>
					<span className="text-xl font-bold">{data.panelCount ?? "0"}</span>
				</div>
			</CardContent>
		</Card>
	);
};
export default InstallationCard;
