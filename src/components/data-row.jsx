import { Card } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import { useContext, useState, useEffect } from 'react'
import { TrainingContext } from './training-context';
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
    const [rmExerciseName, setRmExerciseName] = useState('')
    
    // Percentage changes
    const [yearFrequencyChange, setYearFrequencyChange] = useState(0)
    const [monthFrequencyChange, setMonthFrequencyChange] = useState(0)

    const yearAgoDate = dayjs().subtract(1, 'year');
    const monthAgoDate = dayjs().subtract(1, 'month');
    const twoYearsAgoDate = dayjs().subtract(2, 'year');
    const twoMonthsAgoDate = dayjs().subtract(2, 'month');

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
        let currentYearCount = 0;
        let previousYearCount = 0;
        
        // Current year (last 365 days)
        let filterCurrentYear = history.filter((trainingDay) => dayjs(trainingDay.day, "YYYY-MM-DD").isAfter(yearAgoDate))
        
        // Previous year (365 days before that)
        let filterPreviousYear = history.filter((trainingDay) => {
            const dayDate = dayjs(trainingDay.day, "YYYY-MM-DD");
            return dayDate.isAfter(twoYearsAgoDate) && dayDate.isBefore(yearAgoDate);
        })

        filterCurrentYear.forEach((day) => {
            if (filterSelected) {
                if (day.exercises.findIndex((exercise) => exercise.exercise_name === filterSelected.name) !== -1) {
                    currentYearCount++;
                }
                else if (day.exercises.findIndex((exercise) => exercise.muscle_type === filterSelected.name) !== -1) {
                    currentYearCount++;
                }
            }
            else {
                currentYearCount = filterCurrentYear.length;
            }
        })

        filterPreviousYear.forEach((day) => {
            if (filterSelected) {
                if (day.exercises.findIndex((exercise) => exercise.exercise_name === filterSelected.name) !== -1) {
                    previousYearCount++;
                }
                else if (day.exercises.findIndex((exercise) => exercise.muscle_type === filterSelected.name) !== -1) {
                    previousYearCount++;
                }
            }
            else {
                previousYearCount = filterPreviousYear.length;
            }
        })

        setLastYearFrequency(currentYearCount);
        
        // Calculate percentage change
        const percentageChange = previousYearCount === 0 
            ? (currentYearCount > 0 ? 100 : 0)
            : ((currentYearCount - previousYearCount) / previousYearCount) * 100;
        setYearFrequencyChange(Math.round(percentageChange));
    }
    
    function calculateLastMonthFrequency() {
        let currentMonthCount = 0;
        let previousMonthCount = 0;
        
        // Current month (last 30 days)
        let filterCurrentMonth = history.filter((trainingDay) => dayjs(trainingDay.day, "YYYY-MM-DD").isAfter(monthAgoDate))
        
        // Previous month (30 days before that)
        let filterPreviousMonth = history.filter((trainingDay) => {
            const dayDate = dayjs(trainingDay.day, "YYYY-MM-DD");
            return dayDate.isAfter(twoMonthsAgoDate) && dayDate.isBefore(monthAgoDate);
        })
        
        filterCurrentMonth.forEach((day) => {
            if (filterSelected) {
                if (day.exercises.findIndex((exercise) => exercise.exercise_name === filterSelected.name) !== -1) {
                    currentMonthCount++;
                }
                else if (day.exercises.findIndex((exercise) => exercise.muscle_type === filterSelected.name) !== -1) {
                    currentMonthCount++;
                }
            }
            else {
                currentMonthCount = filterCurrentMonth.length;
            }
        })

        filterPreviousMonth.forEach((day) => {
            if (filterSelected) {
                if (day.exercises.findIndex((exercise) => exercise.exercise_name === filterSelected.name) !== -1) {
                    previousMonthCount++;
                }
                else if (day.exercises.findIndex((exercise) => exercise.muscle_type === filterSelected.name) !== -1) {
                    previousMonthCount++;
                }
            }
            else {
                previousMonthCount = filterPreviousMonth.length;
            }
        })

        setLastMonthFrequency(currentMonthCount);
        
        // Calculate percentage change
        const percentageChange = previousMonthCount === 0 
            ? (currentMonthCount > 0 ? 100 : 0)
            : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
        setMonthFrequencyChange(Math.round(percentageChange));
    }

    function calculateRMWeight() {
        let maxWeight = 0;
        let exerciseWithMaxWeight = '';
        
        // If a specific exercise is selected, find its RM
        if (filterSelected && filterSelected.type === 'exercise') {
            for (let i = history.length - 1; i >= 0; i--) {
                const day = history[i];
                const exercise = day.exercises.find((ex) => ex.exercise_name === filterSelected.name);
                
                if (exercise && exercise.sets && exercise.sets.length > 0) {
                    const dayMaxWeight = Math.max(...exercise.sets.map(set => set.weight || 0));
                    if (dayMaxWeight > maxWeight) {
                        maxWeight = dayMaxWeight;
                        exerciseWithMaxWeight = exercise.exercise_name;
                    }
                }
            }
        }
        // If a muscle group is selected or no filter, find the exercise with highest RM in that muscle group
        else {
            history.forEach((day) => {
                day.exercises.forEach((exercise) => {
                    // Check if exercise matches the filter (muscle group or no filter)
                    const matchesFilter = !filterSelected || 
                                        exercise.muscle_type === filterSelected.name || 
                                        !filterSelected.name;
                    
                    if (matchesFilter && exercise.sets && exercise.sets.length > 0) {
                        const dayMaxWeight = Math.max(...exercise.sets.map(set => set.weight || 0));
                        if (dayMaxWeight > maxWeight) {
                            maxWeight = dayMaxWeight;
                            exerciseWithMaxWeight = exercise.exercise_name;
                        }
                    }
                });
            });
        }

        setRmWeight(maxWeight);
        setRmExerciseName(exerciseWithMaxWeight);
    }

    const formatPercentageChange = (change) => {
        if (change === 0) return "0%";
        const sign = change > 0 ? "+" : "";
        return `${sign}${change}%`;
    }

    const getChangeColor = (change) => {
        if (change > 0) return "text-green-400";
        if (change < 0) return "text-red-400";
        return "text-gray-400";
    }

    const getTotalFrequencyTitle = () => {
        if (!filterSelected || !filterSelected.name) {
            return 'Total Trainings';
        }
        
        // Check if it's a specific exercise
        if (filterSelected.type === 'exercise') {
            return `${filterSelected.name} Days`;
        }
        
        // It's a muscle group
        return `${filterSelected.name} Trainings`;
    }

    function calculateRMWeight() {
        let maxWeight = 0;
        history.forEach((day) => {
            day.exercises.forEach((exercise) => {
                if (filterSelected && exercise.exercise_name === filterSelected.name) {
                    exercise.sets.forEach((set) => {
                        if (set.weight > maxWeight) {
                            maxWeight = set.weight;
                        }
                    })
                }
                else if (filterSelected && exercise.muscle_type === filterSelected.name) {
                    exercise.sets.forEach((set) => {
                        if (set.weight > maxWeight) {
                            maxWeight = set.weight;
                        }
                    })
                }
            })
        })
        setRmWeight(maxWeight);
    }

    useEffect(() => {
        calculateTotalFrequency()
        calculateLastYearFrequency()
        calculateLastMonthFrequency()
        calculateRMWeight()
    }, [filterSelected])


    return(
        <div className='grid grid-cols-4 gap-x-[1rem]'>
            <Card className='content-center justify-items-center p-[1rem]'>
                <SectionName section={getTotalFrequencyTitle()} className='text-xs tracking-normal'/>
                <div className='text-xs font-bold'>{totalFrequency}</div>
            </Card>
            <Card className='content-center justify-items-center p-[1rem]'>
                <SectionName section='Last year frequency' className='text-xs tracking-normal'/>
                <div className='text-xs font-bold'>{lastYearFrequency}</div>
                <div className={`text-xs ${getChangeColor(yearFrequencyChange)}`}>
                    {formatPercentageChange(yearFrequencyChange)}
                </div>
            </Card>
            <Card className='content-center justify-items-center p-[1rem]'>
                <SectionName section='Last month frequency' className='text-xs tracking-normal'/>
                <div className='text-xs font-bold'>{lastMonthFrequency}</div>
                <div className={`text-xs ${getChangeColor(monthFrequencyChange)}`}>
                    {formatPercentageChange(monthFrequencyChange)}
                </div>
            </Card>
            <Card className='content-center justify-items-center p-[1rem]'>
                <SectionName section='RM Weight' className='text-xs tracking-normal'/>
                <div className='text-xs font-bold'>{rmWeight} kg</div>
                <div className='text-xs text-gray-300 text-center'>
                    {rmExerciseName || 'No data'}
                </div>
            </Card>
        </div>
    )
}