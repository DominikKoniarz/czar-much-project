import DashboardHeader from "@/components/pages/dashboard/dashboard-header/DashboardHeader";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getAuth();

	if (!session) {
		redirect("/login");
	}

	return (
		<div>
			<DashboardHeader />
			{children}
		</div>
	);
}
