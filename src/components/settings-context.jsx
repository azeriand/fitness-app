import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import { TrainingContext } from "./common/training-context";
import dayjs from "dayjs";

export const SettingsContext = createContext();

export default function SettingsContextComponent({children}){

    const {history} = useContext(TrainingContext);

    const [defaultStreak, setDefaultStreak] = useState(3);
    const [currentStreak, setCurrentStreak] = useState(0);
    
    function calculateCurrentStreak(){
        //Add the history days into an array
        let days = history.map((routine) => routine.day)
        let daysReversed = [...days].reverse();
        console.log("days", daysReversed)

        //Transform the array elements into days of the week (0-6)
        let daysOfWeek = daysReversed.map((day) => dayjs(day).day());
        console.log("daysOfWeek", daysOfWeek)

        //Create a loop that goes through the days, +1 to a counter if the day is less than or equal to the next (if it reach the defaultStreak, +1 is added to the streak), if it's greater, reset the counter
        let dayCounter = 0;
        let streakCounter = 0;
        let streakActive = false;

        for (let i = 0; i < daysOfWeek.length - 1; i++) {
            const actualDay = daysOfWeek[i];
            const nextDay = daysOfWeek[i + 1];

            //If today is less than or equal to the next day and it's not the end of the array, +1 to the counter
            if (nextDay != undefined && actualDay <= nextDay) {
                dayCounter++;

                //If the counter is greater than or equal to the defaultStreak and the streak is not active, +1 to the streak and activate it
                if (dayCounter >= defaultStreak && !streakActive) {
                    streakCounter++;
                    streakActive = true;
                    setCurrentStreak(streakCounter)
                }
            }
            //If it's the end of the array or today is greater than the next day, we have two options:
            if (nextDay === undefined || actualDay > nextDay) {
                //If the streak is active, reset the counters
                if (!streakActive) {
                    dayCounter = 0;
                    streakCounter = 0;
                    setCurrentStreak(0);
                }
                //If the streak is not active, reset the counter and deactivate the streak
                else {
                    dayCounter = 0;
                    streakActive = false;
                }
            }
            console.log("dayCounter", dayCounter, "streakCounter", streakCounter)
        }
    }
    
    useEffect(calculateCurrentStreak,[defaultStreak])
    console.log(defaultStreak)

    return(
        <SettingsContext.Provider value={{defaultStreak, setDefaultStreak, currentStreak, setCurrentStreak}}>
            {children}
        </SettingsContext.Provider>
    )

}