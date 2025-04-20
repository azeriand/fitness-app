import { createContext } from "react";
import generateTrainingDays from '../../data/generateTrainingDays'

export const TrainingContext = createContext();
export default function TrainingContextComponent({children}){

    const history = generateTrainingDays();

    return(
        <TrainingContext.Provider value={{history}}>
            {children}
        </TrainingContext.Provider>
    )
}