import {useMemo, useState} from "react";
import {PRICE_PER_KWH} from "@/constants/pricing";

interface Props {
    type: 'saved' | 'spent';
}

const SavingsCounter = ({type}: Props) => {
    const [kwhs, setKwhs] = useState(0);
    const money = useMemo(() => kwhs * PRICE_PER_KWH, [kwhs]);
    return <div
        className={`rounded-2xl border-2 ${type === 'saved' ? 'border-primary bg-secondary/20' : 'border-gray-400 bg-gray-100'} 
          p-2  text-sm flex items-center h-10`}>
        {type === 'saved' ? "Saved" : "Spent"}: <span className='text-xl font-bold ml-2 mr-0.5'>{money}</span>zł
    </div>
}
export default SavingsCounter;