import { createContext } from "react";
import generateTrainingDays from '../../data/generateTrainingDays'
import exercises from '../../data/exercises.json'

export const TrainingContext = createContext();
export default function TrainingContextComponent({children}){

    const history = generateTrainingDays();

    return(
        <TrainingContext.Provider value={{history, exercises}}>
            {children}
        </TrainingContext.Provider>
    )
}