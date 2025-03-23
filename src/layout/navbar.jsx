import { useNavigate } from 'react-router-dom';

import Card from '../components/common/card'
import {FaDumbbell} from 'react-icons/fa'
import {FaChartSimple} from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io';
import { TbHomeFilled } from 'react-icons/tb';
import List from '../components/common/list-container';
import ListItem from '../components/common/list-item';
import CalendarView from '../components/common/calendar-view'
import generateTrainingDays from '../data/generateTrainingDays';

export default function NavBar() {

    const selectedDates = generateTrainingDays();

    const navigate = useNavigate()
    return (
        <Card intensity={500} noPadding>
            <CalendarView selectedDates={selectedDates}/>
            <div style={{padding: '1rem'}}>
                <List name='List name'>
                    <ListItem logo={<TbHomeFilled/>} label='Home' onItemClicked={() => navigate('/')}/>
                    <ListItem logo={<FaDumbbell/>} label='Train' onItemClicked={() => navigate('/train')} />
                    <ListItem logo ={<FaChartSimple/>} label='Stats' onItemClicked={() => navigate('/stats')}/>
                    <ListItem logo ={<IoMdSettings/>} label='Settings' onItemClicked={() => navigate('/settings')}/>
                </List>
            </div>
        </Card>
    )
}