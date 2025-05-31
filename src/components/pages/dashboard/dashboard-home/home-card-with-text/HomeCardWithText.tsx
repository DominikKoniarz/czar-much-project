import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"

interface Props {
    title: string;
    currentValue: number;
    totalValue: number;
    type?: 'prod' | 'use';
}

const HomeCardWithText = ({title, currentValue, totalValue, type}: Props) => {
    const cardStyles = type === 'prod' ?
        'border-primary bg-secondary/20' : type === 'use'
            ? 'border-red-500 bg-red-200/20' : 'border-blue-500';

    return <Card className={`border-2  bg-white ${cardStyles} min-w-[200px]`}>
        <CardHeader>
            
            <CardTitle className='whitespace-nowrap text-3xl'>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className='font-extrabold text-end'><span className='text-6xl'>{totalValue}</span> kW</p>
            <p className='text-end'>Current: <span className='font-bold text-xl'>{currentValue}</span> kW</p>
        </CardContent>

    </Card>
}
export default HomeCardWithText;