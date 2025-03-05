
import BasicCard from '../components/basic-card'
import Goku from '../assets/goku.jpg'
import Rat from '../assets/rat-dance.gif'
import Cocroach from '../assets/cocroach-dance.gif'

export default function Home(){
  return(
    <>
    <h1 style={{color:'white'}}>·:\Flowing hommies/:·</h1>
    <BasicCard title='Dancing Rat' src={Rat}/>
    <BasicCard title='Floating Cockroach' src={Cocroach}/>
    <img src={Goku} alt='goku culon' className='culon'/>
  </>
  )
}