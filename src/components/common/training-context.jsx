import { createContext, useState, useEffect } from "react";
import generateTrainingDays from '../../data/generateTrainingDays'
import exercises from '../../data/exercises.json'
import routines from '../../data/routines.json'

export const TrainingContext = createContext();
export default function TrainingContextComponent({ children }) {

    const history = generateTrainingDays();

    const [timer, setTimer] = useState(0)
    const [timerformat, setTimerFormat] = useState("00:00:00")
    const [trainingData, setTrainingData] = useState(routines[0])


    function updateTimer() {
        setTimer((oldValue) => {
            let hours = Math.floor(oldValue/3600)
            let minutes = Math.floor((oldValue%3600)/60)
            let seconds = (oldValue%3600)%60
            console.log(hours, minutes, seconds, oldValue)

            const format = (time) => time<10 ? `0${time}` : `${time}`
            setTimerFormat(`${format(hours)}:${format(minutes)}:${format(seconds)}`)

            return oldValue + 1
        })

    }

    useEffect(() => { setInterval(updateTimer, 1000) }, [])

    return (
        <TrainingContext.Provider value={{ history, exercises, routines, trainingData, setTrainingData, timer, timerformat}}>
            {children}
        </TrainingContext.Provider>
    )
}