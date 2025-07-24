import Card from "./common/card";
import SectionName from "./common/section-name";
import SliderComponent from "./common/slider-component";

export default function EstimateTraining() {
    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='estimate training' className='pb-[0.5rem] tracking-normal'/>
            <div>
                <SectionName section='max weight per rep' className='pb-[0.5rem] tracking-normal'/>
                <SliderComponent/> 
                <SectionName section='max reps per weight' className='pb-[0.5rem] tracking-normal'/>
                <SliderComponent/>
            </div>
        </Card>
    )
}