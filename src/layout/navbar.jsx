import { useNavigate, useLocation } from 'react-router-dom';

import { Card } from 'azeriand-library'
import {FaDumbbell} from 'react-icons/fa'
import {FaChartSimple} from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io';
import { TbHomeFilled } from 'react-icons/tb';
import List from '../components/list-container';
import generateTrainingDays from '../data/generateTrainingDays';
import StreakInfo from '../components/streak-info';
import TrainingWidget from '../components/training-widget';
import Logo from '../components/logo'
import { useState } from 'react';

export default function NavBar() {
    const navigate = useNavigate()
    const location = useLocation();
    const { pathname } = location;

    const [selectedDates] = useState(generateTrainingDays().map(({day}) => day));
    
    const listItems = [
        {logo: <TbHomeFilled/>, label: 'Feed', destination: '/'},
        {logo: <FaDumbbell/>, label: 'Routines', destination: '/routines'},
        {logo: <FaChartSimple/>, label: 'Stats', destination: '/stats'},
        {logo: <IoMdSettings/>, label: 'Settings', destination: '/settings'}
    ]

    const currentItem = listItems.find(item => item.destination === pathname);

    return (
        <Card intensity={500} noPadding className='flex flex-col justify-between h-full'>
            <div>
                <Logo></Logo>
                <StreakInfo noPadding/>
                <div style={{padding: '1rem'}}>
                    <List items={listItems} defaultValue={currentItem} onListItemSelected={(itemSelected) => navigate(itemSelected.destination)}/>
                </div>
            </div>
            <TrainingWidget className='justify-self-end'/>
        </Card>
    )
}