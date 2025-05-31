import UserDevice from "@/components/pages/dashboard-devices/user-device";
import { getUserDevices } from "@/lib/data-access/device";
import { getAuth } from "@/lib/data-access/session";

export default async function DevicesPage() {
	// session will be here bc layout checks
	const session = await getAuth();

	const userDevices = await getUserDevices({
		userId: session?.user.id ?? "",
	});

	return (
		<div>
			{userDevices.map((device) => (
				<UserDevice key={device.id} device={device} />
			))}
		</div>
	);
}
