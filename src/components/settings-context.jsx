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
        //Guardar los días del historial en un array
        let days = history.map((routine) => routine.day)
        let daysReversed = [...days].reverse();
        console.log("days", daysReversed)
        //Transformar el array en dias de la semana (0-6)
        let daysOfWeek = daysReversed.map((day) => dayjs(day).day());
        console.log("daysOfWeek", daysOfWeek)
        //Crear un bucle que recorra los días, sumando 1 a un contador si el día es menor o igual que el siguiente (si cuenta el defaultStreak, se añade +1 al streak), si es mayor se resetea el contador
        let dayCounter = 0;
        let streakCounter = 0;
        let streakActive = false;

        for (let i = 0; i < daysOfWeek.length - 1; i++) {
            const actualDay = daysOfWeek[i];
            const nextDay = daysOfWeek[i + 1];

            //Si hoy es menor o igual que el siguiente día y no es el final del array, sumamos 1 al contador
            if (nextDay != undefined && actualDay <= nextDay) {
                dayCounter++;

                // Si el contador es mayor o igual que el defaultStreak y no está activo el streak, suma uno al streak y se activa
                if (dayCounter >= defaultStreak && !streakActive) {
                    streakCounter++;
                    streakActive = true;
                    setCurrentStreak(streakCounter)
                }
            }
            //Si es el final del array u hoy es mayor que el siguiente día hay dos opciones:
            if (nextDay === undefined || actualDay > nextDay) {
                //Si el streak está activo, se resetea el contador y se desactiva el streak
                if (!streakActive) {
                    dayCounter = 0;
                    streakCounter = 0;
                    setCurrentStreak(0);
                }
                //Si el streak no está activo, se resetea el contador y se desactiva
                else {
                    dayCounter = 0;
                    streakActive = false;
                }
            }
            console.log("dayCounter", dayCounter, "streakCounter", streakCounter)
        }
        // Crear un contador que sume 1 si la semana cumple el requisito y se resetea si no lo cumple
        // Si la semana actual iguala o supera el defaultStreak, se suma 1 al currentStreak

        //return el contador de currentStreak
    }
    
    useEffect(calculateCurrentStreak,[defaultStreak])
    console.log(defaultStreak)

    return(
        <SettingsContext.Provider value={{defaultStreak, setDefaultStreak, currentStreak, setCurrentStreak}}>
            {children}
        </SettingsContext.Provider>
    )

}