import RegisterForm from "@/components/pages/register/register-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) redirect("/dashboard");

	return (
		<main className="w-full h-full grid place-items-center">
			<RegisterForm />
		</main>
	);
}
