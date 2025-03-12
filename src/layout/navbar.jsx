import { useNavigate } from 'react-router-dom';

import Card from '../components/common/card'
import {FaDumbbell} from 'react-icons/fa'
import {FaChartSimple} from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io';
import { TbHomeFilled } from 'react-icons/tb';
import List from '../components/common/list-container';
import ListItem from '../components/common/list-item';

export default function NavBar() {

    const navigate = useNavigate()
    return (
        <Card>
            <div>
                <FaDumbbell></FaDumbbell>
                <FaChartSimple></FaChartSimple>
                <IoMdSettings></IoMdSettings>
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