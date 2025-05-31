import { getUserSolarInstallations } from "@/lib/data-access/installation";
import { getAuth } from "@/lib/data-access/session";
import Link from "next/link";

export default async function SolarInstallationsPage() {
	const session = await getAuth();

	const installations = await getUserSolarInstallations({
		userId: session?.user.id ?? "",
	});

	return (
		<main className="p-4">
			<h1 className="text-2xl font-bold mb-4">Your Solar Installations</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{installations.map((installation) => (
					<div
						key={installation.id}
						className="p-4 border rounded-lg shadow-sm"
					>
						<h2 className="text-xl font-semibold">{installation.name}</h2>
						<p>Total Power: {installation.totalPowerKw} kW</p>
						<p>Panels Count: {installation.panelCount}</p>
						<p>
							Created At:{" "}
							{new Date(installation.createdAt).toLocaleDateString()}
						</p>
						<Link
							href={`/dashboard/installations/${installation.id}`}
							className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Inspect
						</Link>
					</div>
				))}
			</div>
		</main>
	);
}
