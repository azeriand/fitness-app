
import BasicCard from '../components/basic-card'
import Card from '../components/card'
import Goku from '../assets/goku.jpg'
import Rat from '../assets/rat-dance.gif'
import Cocroach from '../assets/cocroach-dance.gif'
import SectionName from '../components/section-name'
import Badge from '../components/badge'
import List from '../components/list-container'
import ListItem from '../components/list-item'

export default function Home(){
  return(
    <>
    <Card appearance='glass'/>
    <Card appearance='mate'/>
    <Card appearance='outlined'/>
    <Card appearance='ghost'/>
    <SectionName section='This is a section name'/>
    <Badge label='Badge'></Badge>
    <h1 style={{color:'white'}}>·:\Flowing hommies/:·</h1>
    <BasicCard title='Dancing Rat' src={Rat}/>
    <BasicCard title='Floating Cockroach' src={Cocroach}/>

    <img src={Goku} alt='goku culon' className='culon'/>
  </>
  )
}