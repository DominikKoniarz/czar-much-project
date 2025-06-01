import LoginForm from "@/components/pages/login/login-form";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getAuth();

    if (session) redirect("/dashboard/home");

    return (
        <main className="grid h-full w-full place-items-center">
            <LoginForm />
        </main>
    );
}
