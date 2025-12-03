
import { useContext } from 'react';
import { RxDragHandleDots2 } from "react-icons/rx";
import { TbDotsVertical } from "react-icons/tb";
import { Button, Card, Avatar, Input, SectionName, Dropdown} from 'azeriand-library'
import ColorBadge from './color-badge';
import { SettingsContext } from './settings-context';

export default function SetsWidget({children, exercise, onAddSet}){

    const { defaultWeightUnit, calculateToIbs } = useContext(SettingsContext);

    return(
        <Card noBlur>
            <div className='flex items-center justify-between mb-[1rem]'>
                <div className='flex items-center gap-x-[0.5rem]'>
                    <Button icon={<RxDragHandleDots2/>} appearance='ghost'/>
                    <Avatar src={exercise.img} className='rounded-sm'/>
                    <div>
                        <p className='m-0'>{exercise.exercise_name}</p>
                        <ColorBadge label={exercise.muscle_type}/>
                    </div>
                </div>
                <div className='flex'>
                    <Dropdown buttonText={exercise.technique} options={exercise.techniques}/>
                    <Button icon={<TbDotsVertical/>} appearance='ghost'/>
                </div>
                
            </div>
            <Card className='rounded-md' noPadding>
                <Input placeholder='Write your notes here!' type='text' className='m-0 p-[0.5rem] text-[0.75rem] text-start w-full'/>
            </Card>
            <div>
            </div>
            <div className='grid grid-cols-[1fr_4fr_2fr_2fr_1fr] justify-items-stretch items-stretch gap-[0.5rem] mt-[1.5rem]'>
                <SectionName className='text-xs' section='set'/>
                <SectionName className='text-xs' section='previous'/>
                <SectionName className='text-xs' section='reps'/>
                <SectionName className='text-xs' section={defaultWeightUnit}/>
                <SectionName className='text-xs' section='done'/>
                {children}
            </div>
            <div className='mt-[1.5rem]'>
                <Button label='Add Set' color='blue' intensity='600' className='w-full' onClick={onAddSet}/>
            </div>
        </Card>
    )
}