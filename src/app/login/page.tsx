import LoginForm from "@/components/pages/login/login-form";
import { getAuth } from "@/lib/data-access/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function LoginPage() {
    const session = await getAuth();

    if (session) redirect("/dashboard/home");

    return (
        <main className="flex h-[100vh] w-full items-center justify-center gap-4">
            <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-5">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={150}
                        height={150}
                    />
                    <h1 className="text-6xl font-thin">Log in</h1>
                </div>
                <LoginForm />
                <div className="my-1 flex justify-center">
                    <p>Or</p>
                </div>
                <Link
                    href="/register"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full",
                    )}
                >
                    Register
                </Link>
            </div>
        </main>
    );
}
