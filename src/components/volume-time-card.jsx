import Card from '../components/common/card'
import Button from '../components/common/button'
import SectionName from './common/section-name'
import { LineChart } from '@mui/x-charts/LineChart'
import { useContext, useEffect, useState } from 'react'
import { ExerciseContext } from './exercise-context'
import { TrainingContext } from './common/training-context'

export default function VolumeTimeCard(){

    const [volumeData, setVolumeData] = useState([]);
    const { history } = useContext(TrainingContext)
    const { filterSelected } = useContext(ExerciseContext)

    function getLineChartData() {
        let dataValue = [];
        history.forEach((day) => {
            let volumeCount = 0;
            let filteredExercises = day.exercises;

            if (filterSelected) {
                if (filterSelected.type === 'exercise') {
                    filteredExercises = day.exercises.filter((exercise) => exercise.exercise_name === filterSelected.name)
                } else if (filterSelected.type === 'muscle_group') {
                    filteredExercises = day.exercises.filter((exercise) => exercise.muscle_type === filterSelected.name)
                }
            }

            filteredExercises.forEach((exercise) => {
                exercise.sets.forEach((set) => volumeCount += set.weight * set.reps);
            });

            dataValue = [...dataValue, volumeCount];

            const limit = 15;
            if (dataValue.length > limit) {
                dataValue = dataValue.splice(dataValue.length - limit, limit);
            }
        })
        setVolumeData(dataValue);
    }

    useEffect(() => {
        getLineChartData();
    }, [history, filterSelected])


    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='volume over time' className='pb-[0.5rem] tracking-normal'/>
            <Card noPadding className='p-[1rem] rounded-xl'>
                <div className='grid grid-cols-3 justify-start gap-[0.5rem] text-wrap'>
                    <Button appearance='mate' label='VOLUME' className='w-full rounded-lg'/>
                    <Button appearance='mate' label='TIME' className='w-full rounded-lg'/>
                </div>
                <div>
                    {
                        volumeData.length > 0 && <LineChart series={[{ data: volumeData, label: 'Volume' }]} />
                    }
                </div>
            </Card>
        </Card>
    )
}