import './Home.css'
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
      <p className='page-name'>Home</p>

      {
        history.map((routine) => <RoutineHistory routine={routine}/>)
      }
    </>
  )
}