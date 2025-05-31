import DashboardHome from "@/components/pages/dashboard/dashboard-home/DashboardHome";

const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-10 p-5">
            <DashboardHome data={[]} />
        </div>
    );
};
export default DashboardPage;
