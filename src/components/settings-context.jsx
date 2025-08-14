import { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();
export default function SettingsContextComponent({children}){

    const [defaultStreak, setDefaultStreak] = useState(3);
    const [currentStreak, setCurrentStreak] = useState(0);
    
    return(
        <SettingsContext.Provider value={{defaultStreak, setDefaultStreak}}>
            {children}
        </SettingsContext.Provider>
    )

}