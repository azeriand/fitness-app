import { Card, NewSlider, SectionName } from 'azeriand-library';
import { useState } from "react";

export default function SliderSpecific({defaultValue, label, calcFunction }){

    const [result, setResult] = useState(0);

    const calculateValue = (event, value) => {
        setResult(calcFunction(value));
    }
    // Add className to NewSlider component in the library
    return(
        <div className='grid grid-cols-12 gap-x-[1rem] flex-wrap p-[1rem]'>
            <NewSlider defaultValue={defaultValue} onChange={calculateValue} className='col-span-8'/>
            <Card noPadding className='content-center justify-items-center col-span-4'>
                <SectionName section={label} className='text-xs tracking-normal'/>
                <div className='text-xs font-bold'>{ result }</div>
            </Card>
        </div>
    )
}