import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {useMemo} from "react";
import {PRICE_PER_KWH} from "@/constants/pricing";

interface Props {
    title: string;
    currentValue: number;
    maxValue: number;
    totalValue: number;
    type?: 'prod' | 'use';
}

const HomeCardWithText = ({title, currentValue, maxValue, totalValue, type}: Props) => {
    const money = useMemo(() => totalValue * PRICE_PER_KWH, [totalValue]);

    const cardStyles = useMemo(() => type === 'prod' ?
        'border-primary bg-secondary/20'
        : type === 'use'
            ? 'border-destructive bg-destructive/10'
            : 'border-blue-500', [type]);

    return <Card className={`border-2  bg-white ${cardStyles} min-w-[200px] gap-2 py-4`}>
        <CardHeader className='px-3'>
            <CardTitle className='whitespace-nowrap text-3xl'>{title}</CardTitle>
        </CardHeader>
        <CardContent className='px-2'>
            <div className='font-extrabold text-end'><span
                className="text-6xl">{totalValue?.toFixed(2) ?? '0.00'} </span>kWh
            </div>
            <div className="flex justify-between items-center px-2">
                <span>Current</span>
                <span className=' font-bold'><span
                    className="text-xl">{currentValue?.toFixed(2) ?? '0.00'} </span>kWh</span>
            </div>
            <div className="flex justify-between items-center px-2">
                <span>Maximum</span>
                <span className=' font-bold'><span
                    className="text-xl">{maxValue?.toFixed(2) ?? '0.00'} </span>kWh</span>
            </div>
            <div className="flex justify-between items-center px-2">
                <span>{type === 'prod' ? 'Saved' : 'Spent'} money</span>
                <span className=' font-bold'><span className="text-xl">{money?.toFixed(2) ?? '0.00'} </span>zł</span>
            </div>
        </CardContent>

    </Card>
}
export default HomeCardWithText;