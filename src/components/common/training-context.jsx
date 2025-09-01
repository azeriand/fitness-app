import { createContext, useState, useEffect, useRef } from "react";
import generateTrainingDays from '../../data/generateTrainingDays'
import exercises from '../../data/exercises.json'
import routines from '../../data/routines.json'

export const TrainingContext = createContext();
export default function TrainingContextComponent({ children }) {

    const history = generateTrainingDays();
    
    let [isTraining, setIsTraining] = useState(false)
    const intervalRef = useRef(null); 

    const [timer, setTimer] = useState(parseInt(localStorage.getItem('localtimer')) || 0)
    const [timerformat, setTimerFormat] = useState("00:00:00")
    const [trainingData, setTrainingData] = useState(routines[0])

    function updateTimer() {
        setTimer((oldTimer) => oldTimer + 1)
    }

    function formatTimer() {
        let hours = Math.floor(timer/3600)
        let minutes = Math.floor((timer%3600)/60)
        let seconds = (timer%3600)%60

        const format = (time) => time<10 ? `0${time}` : `${time}`
        setTimerFormat(`${format(hours)}:${format(minutes)}:${format(seconds)}`)
        
        localStorage.setItem('localtimer', timer.toString())

    }
    
    useEffect(() => {formatTimer()},[timer])

    function startTraining(){
        if (intervalRef.current) return; // evita intervalos duplicados
        setIsTraining(true);
        intervalRef.current = setInterval(updateTimer, 1000);
    }

    function stopTraining() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsTraining(false);   
    }

    function resetTimer() {
        stopTraining();
        setTimer(0);
        localStorage.removeItem("localtimer");
    }

    function switchTimer(){
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
        <TrainingContext.Provider value={{ history, exercises, routines, trainingData, addSet, setTrainingData, startTraining, switchTimer, resetTimer, timer, timerformat}}>
            {children}
        </TrainingContext.Provider>
    )
}