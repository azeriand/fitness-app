
import { Card } from 'azeriand-library'
import { Avatar } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import Goku2 from '../../assets/goku2.jpg'
import { FaArrowTrendUp } from "react-icons/fa6";
import { useContext } from 'react';
import { SettingsContext } from '../settings-context.jsx'

export default function StreakInfo({className, ...cardProps}){

    const { currentStreak } = useContext(SettingsContext);

    return(
        <Card className='flex items-center gap-x-[1.5rem] p-[1rem]' {...cardProps} style={{...cardProps.style}} appearance='ghost'>
            <Avatar src={Goku2} className='size-[5rem] rounded-2xl'/>
            <div>
                <p className='m-0 p-0 font-bold text-start'>Profile 1</p>
                <div className='flex items-center gap-x-[0.5rem]'>
                    <SectionName className='text-xs text-left' section={`${currentStreak} streak weeks`}/>
                    <FaArrowTrendUp/>
                </div>
            </div>
        </Card>
    )
}