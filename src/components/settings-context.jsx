import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import { TrainingContext } from "./training-context";
import dayjs from "dayjs";

export const SettingsContext = createContext();

export default function SettingsContextComponent({ children }) {
    const { history } = useContext(TrainingContext);

    const [defaultStreak, setDefaultStreak] = useState(3);
    const [currentStreak, setCurrentStreak] = useState(0);

    // Use useLocalStorage for defaultWeightUnit to persist changes
    const [defaultWeightUnit, setDefaultWeightUnit] = useLocalStorage('weightUnit', 'KG');
    
    function calculateToIbs(kg){
        if (defaultWeightUnit !== 'IBS') return kg;
        return (kg * 2.20462).toFixed(0);
    }

    function calculateCurrentStreak() {
        let days = history.map((routine) => routine.day);
        let daysReversed = [...days].reverse();
        let daysOfWeek = daysReversed.map((day) => dayjs(day).day());

        let dayCounter = 0;
        let streakCounter = 0;
        let streakActive = false;

        for (let i = 0; i < daysOfWeek.length - 1; i++) {
            const actualDay = daysOfWeek[i];
            const nextDay = daysOfWeek[i + 1];

            if (nextDay != undefined && actualDay <= nextDay) {
                dayCounter++;
                if (dayCounter >= defaultStreak && !streakActive) {
                    streakCounter++;
                    streakActive = true;
                    setCurrentStreak(streakCounter);
                }
            } else {
                if (!streakActive) {
                    dayCounter = 0;
                    streakCounter = 0;
                    setCurrentStreak(0);
                } else {
                    dayCounter = 0;
                    streakActive = false;
                }
            }
        }
    }

    useEffect(calculateCurrentStreak, [defaultStreak]);

    return (
        <SettingsContext.Provider value={{
            defaultStreak,
            setDefaultStreak,
            currentStreak,
            setCurrentStreak,
            defaultWeightUnit,
            setDefaultWeightUnit,
            calculateToIbs
        }}>
            {children}
        </SettingsContext.Provider>
    );
}