import RegisterForm from "@/components/pages/register/register-form";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function RegisterPage() {
	const session = await getAuth();

	if (session) redirect("/dashboard/home");

	return (
		<main className="h-[100vh] w-full flex justify-center items-center gap-4">
			<div className="flex flex-col">
				<div className="flex gap-5 flex-wrap items-center">
					<Image src="/logo.svg" alt="logo" width={150} height={150} />
					<h1 className="text-6xl font-thin">Register</h1>
				</div>
				<RegisterForm />
				<div className="flex justify-center my-1">
					<p>Or</p>
				</div>
				<Link
					href="/login"
					className={cn(buttonVariants({ variant: "outline" }), "w-full")}
				>
					Login
				</Link>
			</div>
		</main>
	);
}
