import { Card } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import { useContext, useState, useEffect } from 'react'
import { TrainingContext } from './common/training-context';
import { ExerciseContext } from './exercise-context';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);


export default function DataRow(){
    const {history} = useContext(TrainingContext)
    const {filterSelected} = useContext(ExerciseContext)
    const [totalFrequency, setTotalFrequency] = useState(0)
    const [lastYearFrequency, setLastYearFrequency] = useState(340)
    const [lastMonthFrequency, setLastMonthFrequency] = useState(100)
    const [rmWeight, setRmWeight] = useState(120)

    const yearAgoDate = dayjs().subtract(1, 'year');
    const monthAgoDate = dayjs().subtract(1, 'month');

    function calculateTotalFrequency() {
        let count = 0;
        history.forEach((day) => {
            if (filterSelected) {
                if (day.exercises.findIndex((exercise) => exercise.exercise_name === filterSelected.name) !== -1) {
                    count++;
                }
                else if (day.exercises.findIndex((exercise) => exercise.muscle_type === filterSelected.name) !== -1) {
                    count++;
                }
            }
            else {
                count = history.length;
            }
        })
        setTotalFrequency(count);
    }

    function calculateLastYearFrequency() {
        let count = 0;
        let filterLastYear = history.filter((trainingDay) => dayjs(trainingDay.day, "YYYY-MM-DD").isAfter(yearAgoDate))

        filterLastYear.forEach((day) => {
            if (filterSelected) {
                if (day.exercises.findIndex((exercise) => exercise.exercise_name === filterSelected.name) !== -1) {
                    count++;
                }
                else if (day.exercises.findIndex((exercise) => exercise.muscle_type === filterSelected.name) !== -1) {
                    count++;
                }
            }
            else {
                count = filterLastYear.length;
            }
        })
        setLastYearFrequency(count);
    }
    
    function calculateLastMonthFrequency() {
        let count = 0;
        let filterLastMonth = history.filter((trainingDay) => dayjs(trainingDay.day, "YYYY-MM-DD").isAfter(monthAgoDate))
        
        filterLastMonth.forEach((day) => {
            if (filterSelected) {
                if (day.exercises.findIndex((exercise) => exercise.exercise_name === filterSelected.name) !== -1) {
                    count++;
                }
                else if (day.exercises.findIndex((exercise) => exercise.muscle_type === filterSelected.name) !== -1) {
                    count++;
                }
            }
            else {
                count = filterLastMonth.length;
            }
        })
        setLastMonthFrequency(count);
    }

    useEffect(() => {
        calculateTotalFrequency()
        calculateLastYearFrequency()
        calculateLastMonthFrequency()
    }, [filterSelected])


    return(
        <Card noPadding appearance='ghost' className='grid grid-rows-2 gap-y-[3rem]'>
            <div>
                <SectionName section='frequency' className='pb-[0.5rem] tracking-normal'/>
                <Card noPadding className='grid grid-cols-3 gap-x-[0.5rem] flex-wrap p-[1rem] rounded-xl'>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='total' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{totalFrequency}</div>
                    </Card>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='last year' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{lastYearFrequency}</div>
                    </Card>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='last month' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{lastMonthFrequency}</div>
                    </Card>
                </Card>
            </div>
            <div>
                <SectionName section='weight' className='pb-[0.5rem] tracking-normal'/>
                <Card noPadding className='grid grid-cols-3 gap-x-[0.5rem] flex-wrap p-[1rem] rounded-xl'>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='rm' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{rmWeight}</div>
                    </Card>
                </Card>
            </div>
        </Card>
    )
}