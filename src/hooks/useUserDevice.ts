import { useAction } from "next-safe-action/hooks";
import { toggleDeviceAction } from "@/actions/device";
import { actionError } from "@/lib/action-error";

const useUserDevice = () => {
	const { execute, isExecuting } = useAction(toggleDeviceAction, {
		onError: (error) => {
			actionError(error).default();
		},
	});

	return {
		execute,
		isExecuting,
	};
};
export default useUserDevice;
