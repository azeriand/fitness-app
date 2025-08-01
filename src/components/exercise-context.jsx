import { createContext, useContext, useState } from 'react'
import { TrainingContext } from './common/training-context';

export const ExerciseContext = createContext();
export default function ExerciseContextComponent({ children }){

    const {exercises, history} = useContext(TrainingContext)
    const [searchValue, setSearchValue] = useState('')

    const [filterSelected, setFilterSelected] = useState(null);

    return(
        <ExerciseContext.Provider value={{exercises, history, searchValue, setSearchValue, filterSelected, setFilterSelected}}>
            {children}
        </ExerciseContext.Provider>
    )
}