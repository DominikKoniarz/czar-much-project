import RegisterForm from "@/components/pages/register/register-form";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
	const session = await getAuth();

	if (session) redirect("/dashboard/home");

	return (
		<main className="w-full h-full grid place-items-center">
			<RegisterForm />
		</main>
	);
}
