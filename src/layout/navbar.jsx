import Card from '../components/card'
import {FaDumbbell} from 'react-icons/fa'
import {FaChartSimple} from 'react-icons/fa6'

export default function NavBar() {
    return (
        <Card>
            <div>
                <FaDumbbell></FaDumbbell>
                <FaChartSimple></FaChartSimple>
            </div>
        </Card>
    )
}