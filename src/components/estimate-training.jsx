import Card from "./common/card";
import SectionName from "./common/section-name";
import SliderSpecific from "./slider-specific";
import { useContext, useEffect, useState } from "react";
import { TrainingContext } from "./common/training-context";
import { ExerciseContext } from "./exercise-context";

export default function EstimateTraining() {

    const { history } = useContext(TrainingContext);
    const { filterSelected } = useContext(ExerciseContext);
    const [rm, setRm] = useState(0);

    const duplicateSliderValue = (value) => {
        return value * 2
    };

    //1RM = Peso levantado / [1.0278 - (0.0278 * número de repeticiones)] 
    function getRM() {
        let exerciseRM = [];
        if (filterSelected && filterSelected.type === 'exercise') {
            const dayFound = history.find((day) => day.exercises.find((exercise) => exercise.exercise_name === filterSelected.name) !== undefined)
            if (dayFound){
                const exerciseFound = dayFound.exercises.find((exercise) => exercise.exercise_name === filterSelected.name);
                if (exerciseFound) {
                    exerciseFound.sets.forEach((set) => {exerciseRM.push(set.weight / (1.0278 - (0.0278 * set.reps)))}) 
                }
            }
            
        }
        setRm(exerciseRM.reduce((prev, curr) => prev + curr, 0) / exerciseRM.length);
    }


    useEffect(getRM, [filterSelected])

    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='estimate training' className='pb-[0.5rem] tracking-normal'/>
            <Card noPadding className='rounded-xl p-[1rem]'>
                <SectionName section='max weight per rep' className='pb-[0.5rem] tracking-normal'/>
                <SliderSpecific defaultValue='50' label='rm' calcFunction={duplicateSliderValue}/>

                <SectionName section='max reps per weight' className='pb-[0.5rem] tracking-normal'/>
                <SliderSpecific defaultValue='50' label='reps' calcFunction={duplicateSliderValue}/>
            </Card>
        </Card>
    )
}