import './streak-info.css'
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
            <Avatar src={Goku2} size='5'/>
            <div>
                <p className='profile-name'>Profile 1</p>
                <div className='sectionIcon'>
                    <SectionName size='sm' section='12 streak weeks'/>
                    <FaArrowTrendUp/>
                </div>
            </div>
        </Card>
    )
}