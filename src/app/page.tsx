"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/dashboard/home");
    }, [router]);

    return <div>Home</div>;
};
export default Home;
