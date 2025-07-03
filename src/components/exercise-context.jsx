import { createContext, useContext, useState } from 'react'
import { TrainingContext } from './common/training-context';

export const ExerciseContext = createContext();
export default function ExerciseContextComponent({ children }){

    const {exercises, history} = useContext(TrainingContext)
    const [searchValue, setSearchValue] = useState('')

    return(
        <ExerciseContext.Provider value={{exercises, history, searchValue, setSearchValue}}>
            {children}
        </ExerciseContext.Provider>
    )
}