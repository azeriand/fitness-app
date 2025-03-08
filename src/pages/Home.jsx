
import BasicCard from '../components/basic-card'
import Card from '../components/card'
import Goku from '../assets/goku.jpg'
import Rat from '../assets/rat-dance.gif'
import Cocroach from '../assets/cocroach-dance.gif'
import SectionName from '../components/section-name'
import Badge from '../components/badge'
import Button from '../components/button'
import Checkbox from '../components/checkbox'
import Input from '../components/input'
import {FaDumbbell} from 'react-icons/fa'

export default function Home(){
  return(
    <>
    <Card appearance='glass'/>
    <Card appearance='mate' color='purple' intensity={500}/>
    <Card appearance='outlined'/>
    <Card appearance='ghost'/>
    <Checkbox label='This is a checkbox!'/>
    <Input type='number'/>
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