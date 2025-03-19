import { DateCalendar } from '@mui/x-date-pickers';
import Card from './card'
import './calendar-view.css'

export default function CalendarView({listOfDates}){
    return(
        <Card noPadding fitWidth>
            <DateCalendar/>
        </Card>
    )
}