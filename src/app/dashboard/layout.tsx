import DashboardHeader from "@/components/pages/dashboard/dashboard-header/DashboardHeader";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <DashboardHeader/>
            {children}
        </div>
    );
}