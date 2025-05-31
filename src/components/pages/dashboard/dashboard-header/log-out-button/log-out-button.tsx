"use client";

import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { actionError } from "@/lib/action-error";
import { LoaderCircle, LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const useLogOutButton = () => {
	const router = useRouter();

	const { execute, isPending } = useAction(logoutAction, {
		onError: (error) => {
			actionError(error).default();
		},
		onSuccess: () => {
			router.push("/");
		},
	});

	return {
		execute,
		isPending,
	};
};

export default function LogOutButton() {
	const { execute, isPending } = useLogOutButton();

	return (
		<Button
			type="submit"
			className="relative h-10 rounded-2xl hover:bg-red-500/80 w-10 bg-red-500 grid place-items-center p-0 cursor-pointer"
			disabled={isPending}
			onClick={() => execute()}
		>
			<LoaderCircle
				className={cn(
					"absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 animate-spin",
					!isPending && "hidden"
				)}
			/>
			<span className={cn(isPending && "invisible")}>
				<LogOut />
			</span>
		</Button>
	);
}
