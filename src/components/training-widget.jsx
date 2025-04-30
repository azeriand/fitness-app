import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import Button from './common/button'
import Card from './common/card'
import Input from './common/input'

export default function TrainingWidget({...cardProps}){
    const trainingWidgetProps = {
        padding: '0.5rem'
    }

    const inputClassNames = 'rounded-sm w-[2.5rem] h-[2.5rem] text-base box-border !px-0 text-center font-bold'

    return(
        <Card noBlur intensity={500} {...cardProps} style={{...cardProps.style, ...trainingWidgetProps}}>
            <div className='flex items-center justify-between'>
                <div className='font-bold text-[1.5rem]'>12:26</div>
                <div className='flex items-center'>
                    <Button icon={<FaPause/>} appearance='ghost'/>
                    <Button icon={<FaStop/>} color='mate'/>
                </div>

            </div>
            <div className='flex items-center justify-between py-[0.5rem]'>
                <div className='truncate text-[1.1rem] font-bold justify-center'>Bench Press</div>
                <div className='flex items-center gap-x-[0.25rem]'>
                    <Button icon={<FaChevronLeft/>} appearance='mate' size='sm'/>
                    <Input className={inputClassNames} maxLength='3' style={cardProps.style}/>
                    <Input className={inputClassNames} maxLength='3' style={cardProps.style}/>
                    <Button icon={<FaChevronRight/>} appearance='mate' size='sm'/>
                </div>
            </div>
            <div className='flex items-center justify-around gap-x-[0.5rem]'>
                <Button label='Open' className='w-full'/>
                <Button label='Finish' color='green' intensity='600' className='w-full'/>
                <Button label='Discard' color='red' intensity='600' className='w-full'/>
            </div>
        </Card>
    )
}