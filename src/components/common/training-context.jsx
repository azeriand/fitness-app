import { createContext, useState, useEffect } from "react";
import generateTrainingDays from '../../data/generateTrainingDays'
import exercises from '../../data/exercises.json'
import routines from '../../data/routines.json'

export const TrainingContext = createContext();
export default function TrainingContextComponent({ children }) {

    const history = generateTrainingDays();
    const [intervalId, setIntervalId] = useState(null)
    let [isTraining, setIsTraining] = useState(false)

    const [timer, setTimer] = useState(parseInt(localStorage.getItem('localtimer')) || 0)
    const [timerformat, setTimerFormat] = useState("00:00:00")
    const [trainingData, setTrainingData] = useState(routines[0])


    function updateTimer() {
        setTimer((oldValue) => {
            let hours = Math.floor(oldValue/3600)
            let minutes = Math.floor((oldValue%3600)/60)
            let seconds = (oldValue%3600)%60

            const format = (time) => time<10 ? `0${time}` : `${time}`
            setTimerFormat(`${format(hours)}:${format(minutes)}:${format(seconds)}`)

            return oldValue + 1
        })
        
    }

    useEffect(() => {
        localStorage.setItem('localtimer', timer.toString())
    },[timer])

    function startTraining(){
        setIsTraining(true)
        setIntervalId(setInterval(updateTimer, 1000))
        console.log(intervalId)
    }

    function stopTraining() {
        setIsTraining(false)
        clearInterval(intervalId)
        setIntervalId(null)
    }

    function switchTimer(){
        console.log(intervalId)
        if (isTraining){
            stopTraining()
        }
        else{
            startTraining()
        }
    }

    function addSet(exerciseName){
        setTrainingData((oldTrainingData) => {
            let targetExercise = oldTrainingData.exercises.find(({exercise_name}) => {
                return exercise_name === exerciseName
            })

            targetExercise.sets.push({"KG":"", "reps":""})
            return oldTrainingData
        })

    }

    return (
        <TrainingContext.Provider value={{ history, exercises, routines, trainingData, addSet, setTrainingData, startTraining, switchTimer, timer, timerformat}}>
            {children}
        </TrainingContext.Provider>
    )
}