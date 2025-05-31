import HomeCardWithText from "@/components/pages/dashboard/dashboard-home/home-card-with-text/HomeCardWithText";

const DashboardPage = () => {
    return <div className='flex flex-col gap-10 p-5'>
        <div className='flex gap-10'>
            <HomeCardWithText title='Production' currentValue={100.11} totalValue={11.20} type='prod'/>
            <HomeCardWithText title='Use' currentValue={10.12} totalValue={11.22} type='use'/>
        </div>
    </div>
}
export default DashboardPage;