
import BasicCard from '../components/common/basic-card'
import Card from '../components/common/card'
import Goku from '../assets/goku.jpg'
import Rat from '../assets/rat-dance.gif'
import Cocroach from '../assets/cocroach-dance.gif'
import SectionName from '../components/common/section-name'
import Badge from '../components/common/badge'
import Button from '../components/common/button'
import Checkbox from '../components/common/checkbox'
import Input from '../components/common/input'
import Avatar from '../components/common/avatar'
import Timeline from '../components/common/timeline'
import TlListItem from '../components/common/timeline-list-item'
import TrainingWidget from '../components/training-widget'
import Tab from '../components/common/tab'
import Dropdown from '../components/common/dropdown/dropdown'
import RoutineCard from '../components/routine-card'
import RoutineHistory from '../components/routine-history'
import {FaDumbbell} from 'react-icons/fa'
import { useContext } from 'react'
import {ThemeContext} from '../components/common/theme-context'
import { TrainingContext } from '../components/common/training-context'
import dayjs from 'dayjs'

export default function Home(){

  const {history} = useContext(TrainingContext)
  const options = ['Item 1', 'Item 2', 'Item 3'];

  const dropdownSelected = (option) => {
    console.log('Elemento seleccionado', option);
  }

  const tabsItems = ['Last Trainings', 'Muscle Groups', 'Per Exercise'];

  return(
    <>
    <Card appearance='glass'/>
    <Card appearance='mate' color='purple' intensity={500}/>
    <Card appearance='outlined'/>
    <Card appearance='ghost'/>
    <Dropdown buttonText='Dropdown Button' options={options} onSelected={dropdownSelected}></Dropdown>
    <Tab items={tabsItems} onTabSelected={(tab) => console.log('Tab Selected: ', tab)}/>
    <TrainingWidget/>
    <Checkbox label='This is a checkbox!'/>
    <Timeline>
      <TlListItem label='Hip thrust' badge={<Badge label='Glutes' color='neutral'/>}/>
      <TlListItem label='Leg extension' badge={<Badge label='Quads' color='neutral'/>}/>
      <TlListItem label='Bench Press' badge={<Badge label='Chest' color='neutral'/>}/>
    </Timeline>

    {
      history.map((routine) => <RoutineHistory routine={routine}/>)
    }

    <Input type='tel' placeholder='Phone number here'/>
    <Avatar size='5' rounded='s' src={Goku}/>
    <div style={{display:'flex'}}>
      <Button label='Glass' icon={<FaDumbbell/>} position='left' appearance='glass'/>
      <Button label='Mate' appearance='mate' color='purple' intensity={500}/>
      <Button label='Outlined' appearance='outlined'/>
      <Button label='Ghost' appearance='ghost'/>
      <Button icon={<FaDumbbell/>}/>
    </div>
    <SectionName section='This is a section name'/>
    <Badge label='Badge' color='red' intensity={600}></Badge>
    <h1 style={{color:'white'}}>·:\Flowing hommies/:·</h1>
    <BasicCard title='Dancing Rat' src={Rat}/>
    <BasicCard title='Floating Cockroach' src={Cocroach}/>

    <img src={Goku} alt='goku culon' className='culon'/>
  </>
  )
}