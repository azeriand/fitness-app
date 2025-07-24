import Card from "./common/card";
import SectionName from "./common/section-name";
import SliderComponent from "./common/slider-component";

export default function EstimateTraining() {
    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='estimate training' className='pb-[0.5rem] tracking-normal'/>
        </Card>
    )
}