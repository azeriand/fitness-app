import { useNavigate, useLocation } from 'react-router-dom';

import Card from '../components/common/card'
import {FaDumbbell} from 'react-icons/fa'
import {FaChartSimple} from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io';
import { TbHomeFilled } from 'react-icons/tb';
import List from '../components/common/list-container';
import generateTrainingDays from '../data/generateTrainingDays';
import SectionName from '../components/common/section-name';
import StreakInfo from '../components/common/streak-info';
import TrainingWidget from '../components/training-widget';
import Logo from '../components/logo'
import { useState } from 'react';

export default function NavBar() {
    const navigate = useNavigate()
    const location = useLocation();
    const { pathname } = location;

    const [selectedDates] = useState(generateTrainingDays().map(({day}) => day));
    
    const listItems = [
        {logo: <TbHomeFilled/>, label: 'Home', destination: '/'},
        {logo: <FaDumbbell/>, label: 'Routines', destination: '/routines'},
        {logo: <FaChartSimple/>, label: 'Stats', destination: '/stats'},
        {logo: <IoMdSettings/>, label: 'Settings', destination: '/settings'}
    ]

    const currentItem = listItems.find(item => item.destination === pathname);

    return (
        <Card intensity={500} noPadding>
            <Logo></Logo>
            <StreakInfo/>
            <SectionName section='streak'/>
            {/* <CalendarView selectedDates={selectedDates}/> */}
            <div style={{padding: '1rem'}}>
                <List name='List name' items={listItems} defaultValue={currentItem} onListItemSelected={(itemSelected) => navigate(itemSelected.destination)}/>
            </div>
            <TrainingWidget/>
        </Card>
    )
}