import LoginForm from "@/components/pages/login/login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) redirect("/dashboard/home");

	return (
		<main className="w-full h-full grid place-items-center">
			<LoginForm />
		</main>
	);
}
