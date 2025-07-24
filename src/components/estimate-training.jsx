import Card from "./common/card";
import SectionName from "./common/section-name";
import SliderSpecific from "./slider-specific";

export default function EstimateTraining() {

    const duplicateSliderValue = (value) => {
        return value * 2
    };

    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='estimate training' className='pb-[0.5rem] tracking-normal'/>
            <Card noPadding className='rounded-xl p-[1rem]'>
                <SectionName section='max weight per rep' className='pb-[0.5rem] tracking-normal'/>
                <SliderSpecific defaultValue='50' label='rm' calcFunction={duplicateSliderValue}/>

                <SectionName section='max reps per weight' className='pb-[0.5rem] tracking-normal'/>
                <SliderSpecific defaultValue='50' label='reps' calcFunction={duplicateSliderValue}/>
            </Card>
        </Card>
    )
}