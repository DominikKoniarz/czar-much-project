import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Czar Much Project",
	description: "Czar Much Project",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<header className="w-full p-4 gap-4 flex flex-row items-center justify-start">
					<Link href="/" className="text-xl font-bold">
						Home
					</Link>
					<Link href="/login" className="text-xl font-bold">
						Login
					</Link>
					<Link href="/register" className="text-xl font-bold">
						Register
					</Link>
				</header>
				{children}
			</body>
		</html>
	);
}
