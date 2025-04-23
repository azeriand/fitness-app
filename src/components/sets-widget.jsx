import './sets-widget.css'
import { RxDragHandleDots2 } from "react-icons/rx";
import { TbDotsVertical } from "react-icons/tb";
import Goku from '../assets/goku.jpg'
import Badge from './common/badge'
import Dropdown from './common/dropdown/dropdown'
import Button from './common/button'
import Card from './common/card'
import Avatar from './common/avatar';
import SectionName from './common/section-name';

export default function SetsWidget({children}){

    const options = ["Barbell", "Dumbbells", "Smith Machine"]
    return(
        <Card noBlur>
            <div className='flex items-center justify-between mb-[1rem]'>
                <div className='flex items-center gap-x-[0.5rem]'>
                    <Button icon={<RxDragHandleDots2/>} appearance='ghost'/>
                    <Avatar src={Goku} size='3' rounded='s'/>
                    <div>
                        <p className='m-0'>Chess Press</p>
                        <Badge label='Chest'/>
                    </div>
                </div>
                <div className='flex'>
                    <Dropdown buttonText='Barbell' options={options}/>
                    <Button icon={<TbDotsVertical/>} appearance='ghost'/>
                </div>
                
            </div>
            <Card noPadding rounded='md'>
                <p className='m-0 p-[0.5rem] text-[0.75rem] text-start'>Lore ipsum no se que, lo que siempre ponen aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            </Card>
            <div>
            </div>
            <div className='set-grid'>
                <SectionName size="sm" section='set'/>
                <SectionName size="sm" section='previous'/>
                <SectionName size="sm" section='reps'/>
                <SectionName size="sm" section='kg'/>
                <SectionName size="sm" section='done'/>
                {children}
            </div>
            <div className='mt-[1.5rem]'>
                <Button label='Add Set' color='blue' intensity='600' fullWidth/>
            </div>
        </Card>
    )
}