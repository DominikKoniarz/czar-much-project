import {Button, buttonVariants} from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Sun, Zap, BarChart3, Shield } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";
import Calculator from "@/components/pages/dashboard/dashboard-header/calculator/Calculator";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b border-emerald-100">
                <div className="container mx-auto flex h-25 items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/*<Leaf className="h-8 w-8 text-emerald-600" />*/}
                        {/*<span className="text-xl font-bold text-emerald-700">GreenCore</span>*/}
                        <Image src='/logo.svg' alt='GreenCore' height={100} width={100} />
                    </div>

                    <Link className={cn(buttonVariants())} href='/dashboard/home'>
                        Dashboard</Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-white to-emerald-50 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="mx-auto mb-8 flex justify-center">
                            <Leaf className="h-24 w-24 text-emerald-600" strokeWidth={1.5} />
                        </div>
                        <h1 className="mb-6 text-5xl font-bold text-emerald-800 md:text-6xl">GreenCore</h1>
                        <p className="mx-auto mb-8 max-w-2xl text-xl text-emerald-700">
                            Optimizing your photovoltaic energy usage for maximum efficiency and sustainability
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Calculator/>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold text-emerald-800 md:text-4xl">Why Choose GreenCore</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="border-emerald-100 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-2">
                                    <Sun className="h-12 w-12 text-emerald-600 mb-2" />
                                    <CardTitle className="text-emerald-700">Maximum Energy Yield</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-emerald-600 text-base">
                                        Our advanced algorithms optimize your solar panels to capture maximum energy throughout the day,
                                        increasing efficiency by up to 25%.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-100 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-2">
                                    <Zap className="h-12 w-12 text-emerald-600 mb-2" />
                                    <CardTitle className="text-emerald-700">Smart Energy Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-emerald-600 text-base">
                                        Intelligently distribute energy where and when it&#39;s needed most, reducing waste and maximizing the
                                        value of your solar investment.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-100 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-2">
                                    <BarChart3 className="h-12 w-12 text-emerald-600 mb-2" />
                                    <CardTitle className="text-emerald-700">Real-time Monitoring</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-emerald-600 text-base">
                                        Access detailed analytics and insights about your energy production and consumption patterns through
                                        our user-friendly dashboard.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-100 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-2">
                                    <Shield className="h-12 w-12 text-emerald-600 mb-2" />
                                    <CardTitle className="text-emerald-700">Increased System Longevity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-emerald-600 text-base">
                                        Our optimization techniques reduce strain on your system components, extending the lifespan of your
                                        photovoltaic installation.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-100 shadow-md hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                                <CardHeader className="pb-2">
                                    <Leaf className="h-12 w-12 text-emerald-600 mb-2" />
                                    <CardTitle className="text-emerald-700">Environmental Impact</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-emerald-600 text-base">
                                        By optimizing your renewable energy usage, you&#39;re further reducing your carbon footprint and
                                        contributing to a more sustainable future.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-emerald-600 py-16 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to optimize your solar energy?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg">
                            Join thousands of satisfied customers who have increased their energy efficiency with GreenCore&#39;s
                            solutions.
                        </p>
                        <Button className="bg-white text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6">
                            Contact Us Today
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="bg-emerald-800 py-12 text-emerald-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-8 md:mb-0">
                            <div className="flex items-center gap-2 mb-4">
                                <Leaf className="h-6 w-6" />
                                <span className="text-xl font-bold">GreenCore</span>
                            </div>
                            <p className="max-w-xs text-emerald-200">
                                Optimizing photovoltaic energy usage for a greener, more sustainable future.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Company</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Team
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Careers
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Services</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Optimization
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Installation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Maintenance
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Contact</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Support
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Sales
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">
                                            Partners
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-emerald-700 pt-8 text-center text-emerald-300">
                        <p>© {new Date().getFullYear()} GreenCore. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
