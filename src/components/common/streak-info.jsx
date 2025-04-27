
import Card from './card'
import Avatar from './avatar'
import SectionName from './section-name'
import Goku2 from '../../assets/goku2.jpg'
import { FaArrowTrendUp } from "react-icons/fa6";

export default function StreakInfo({...cardProps}){

    const cardStyle = {
        display:'flex',
        alignItems:'center',
        columnGap: '1.5rem',
        padding: '1rem',
    }

    return(
        <Card {...cardProps} style={{...cardStyle, ...cardProps.style}} appearance='ghost'>
            <Avatar src={Goku2} className='size-[5rem] rounded-2xl'/>
            <div>
                <p className='m-0 p-0 font-bold text-start'>Profile 1</p>
                <div className='flex items-center gap-x-[0.5rem]'>
                    <SectionName size='sm' section='12 streak weeks'/>
                    <FaArrowTrendUp/>
                </div>
            </div>
        </Card>
    )
}