import Card from "./common/card";
import SliderComponent from "./common/slider-component";
import SectionName from "./common/section-name";
import { useState } from "react";

export default function SliderSpecific({defaultValue, label, calcFunction }){

    const [result, setResult] = useState(0);

    const calculateValue = (event, value) => {
        setResult(calcFunction(value));
    }

    return(
        <div className='grid grid-cols-[70%_30%] gap-x-[0.5rem] flex-wrap p-[1rem]'>
            <SliderComponent defaultValue={defaultValue} onChange={calculateValue}/> 
            <Card noPadding className='content-center justify-items-center'>
                <SectionName section={label} className='text-xs tracking-normal'/>
                <div className='text-xs font-bold'>{ result }</div>
            </Card>
        </div>
    )
}