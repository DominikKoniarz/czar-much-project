import LoginForm from "@/components/pages/login/login-form";
import { getAuth } from "@/lib/data-access/session";
import {redirect} from "next/navigation";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
export default async function LoginPage() {
    const session = await getAuth();

    if (session) redirect("/dashboard/home");

    return (
        <main className="h-[100vh] w-full flex justify-center items-center gap-4">
            <div className="flex flex-col">
                <div className="flex gap-5 flex-wrap items-center">
                    <Image src='/logo.svg' alt='logo' width={150} height={150}  />
                    <h1 className='text-6xl font-thin'>Log in</h1>
                </div>
                <LoginForm />
                <div className='flex justify-center my-1'><p >Or</p></div>
                <Link href='/register' className='w-full flex justify-center'>
                    <Button variant='outline' className='w-full' >Register</Button>
                </Link>
            </div>
        </main>
    );
}
