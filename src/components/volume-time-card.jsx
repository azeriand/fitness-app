import { Card } from 'azeriand-library'
import { Button } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import { LineChart } from '@mui/x-charts/LineChart'
import { useContext, useEffect, useState } from 'react'
import { ExerciseContext } from './exercise-context'
import { TrainingContext } from './training-context'

export default function VolumeTimeCard(){

    const [volumeData, setVolumeData] = useState([]);
    const [xData, setXData] = useState([]);
    const { history } = useContext(TrainingContext)
    const { filterSelected } = useContext(ExerciseContext)

    function getLineChartData() {
        let dataValue = [];
        let xLabels = []
        history.forEach((day) => {
            let volumeCount = 0;
            let date = day.day
            let filteredExercises = day.exercises;

            if (filterSelected) {
                if (filterSelected.type === 'exercise') {
                    filteredExercises = day.exercises.filter((exercise) => exercise.exercise_name === filterSelected.name)
                } else if (filterSelected.type === 'muscle_group') {
                    filteredExercises = day.exercises.filter((exercise) => exercise.muscle_type === filterSelected.name)
                }
            }

            for (const exercise of filteredExercises) {
                exercise.sets.forEach((set) => volumeCount += set.weight * set.reps);
            }

            dataValue = [...dataValue, volumeCount];
            xLabels = [...xLabels, date];

            const limit = 15;
            if (dataValue.length > limit) {
                dataValue = dataValue.splice(0, limit);
            }

            if (xLabels.length > limit) {
                xLabels = xLabels.splice(0, limit);
            }
        })
        setVolumeData(dataValue.reverse());
        setXData(xLabels.reverse());
    }

    useEffect(() => {
        getLineChartData();
    }, [history, filterSelected])


    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='volume over time' className='pb-[0.5rem] tracking-normal'/>
            <Card noPadding className='p-[1rem] rounded-xl'>
                <div className='grid grid-cols-3 justify-start gap-[1.5rem] text-wrap'>
                    <Button appearance='mate' label='VOLUME' className='w-full rounded-lg'/>
                    <Button appearance='mate' label='TIME' className='w-full rounded-lg'/>
                </div>
                <div>
                    {
                        volumeData.length > 0 && <LineChart series={[{ data: volumeData, label: 'Volume' }]} xAxis={[{ scaleType: 'point', data: xData }]} />
                    }
                </div>
            </Card>
        </Card>
    )
}