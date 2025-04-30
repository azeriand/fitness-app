import Card from './common/card'
import Button from './common/button'
import SectionName from './common/section-name'
import Input from './common/input'
import ExerciseCard from './exercise-card'
import { HiPlusSm } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { useContext } from 'react'
import { TrainingContext } from '../components/common/training-context'

export default function AddExercise(){

    const {exercises} = useContext(TrainingContext)
    const [searchbarValue, setSearchbarValue] = useState('')

    function inputUpdated(value){
        setSearchbarValue(value)
    }

    return(
        <>
            <Card appearance='ghost'>
                <SectionName section='add exercise'/>
                <Card>
                    <Input type='search' placeholder='Search exercises...' iconPosition='right' icon={IoMdSearch} fullWidth onChange={inputUpdated}/>
                    {
                        exercises.filter((exercise) => exercise.contains(value))
                        .map((exercise) => (
                            <div className='flex'>
                                <Button appearance='ghost' icon={HiPlusSm} onClick/>
                                <ExerciseCard/>

                            </div>
                        ))
                    }
                </Card>
            </Card>
        </>
    )
}