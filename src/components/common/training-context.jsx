import { createContext, useState, useEffect, useRef } from "react";
import generateTrainingDays from '../../data/generateTrainingDays'
import exercises from '../../data/exercises.json'
import routines from '../../data/routines.json'
import useLocalStorage from "../../hooks/useLocalStorage";

export const TrainingContext = createContext();
export default function TrainingContextComponent({ children }) {

    const history = generateTrainingDays();
    
    const intervalRef = useRef(null); 

    const [timer, setTimer, removeTimer] = useLocalStorage('training-timer', 0)
    const [timerformat, setTimerFormat] = useState("00:00:00")
    const [trainingData, setTrainingData, removeTrainingData] = useLocalStorage('current-training', {
        "routine_name" : "",
        "created_day" : "17/05/2024 12:43",
        "exercises" : [],
        "state": "RUNNING"
    })

    function updateTimer() {
        setTimer((oldTimer) => {
            console.log('Timer', oldTimer)
            return oldTimer + 1
        })
    }

    function formatTimer() {
        let hours = Math.floor(timer/3600)
        let minutes = Math.floor((timer%3600)/60)
        let seconds = (timer%3600)%60

        const format = (time) => time<10 ? `0${time}` : `${time}`
        setTimerFormat(`${format(hours)}:${format(minutes)}:${format(seconds)}`)
        
        // localStorage.setItem('localtimer', timer.toString())

    }
    
    useEffect(() => {formatTimer()},[timer])

    function startTraining(){
        if (intervalRef.current) return;
        setTrainingData(({state, ...oldTrainingData}) => ({...oldTrainingData, state: 'RUNNING'}))
        intervalRef.current = setInterval(updateTimer, 1000);
    }

    function pauseTraining() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTrainingData(({state, ...oldTrainingData}) => ({...oldTrainingData, state: 'PAUSED'}))
    }
    
    function resetTimer() {
        pauseTraining();
        removeTimer();
        removeTrainingData();
        setTrainingData(({state, ...oldTrainingData}) => ({...oldTrainingData, state: 'RUNNING'}))
    }

    function switchTimer(){
        if (trainingData.state === 'RUNNING'){
            pauseTraining()
        }
        else{
            startTraining()
        }
    }

    function addExercise(exerciseName) {
        setTrainingData((oldTrainingData) => {
            const newTrainingData = {...oldTrainingData}
            newTrainingData.exercises.push({
                exercise_name: exercises.find((ex) => ex.exercise_name === exerciseName).exercise_name,
                sets: []
            });
            return newTrainingData;
        })
    }

    function addSet(exerciseName){
        
        setTrainingData((oldTrainingData) => {
            const newTrainingData = {...oldTrainingData}
            const targetExercise = newTrainingData.exercises.find(({exercise_name}) => {
                return exercise_name === exerciseName
            })

            targetExercise.sets.push({ KG: "", reps: "" })
            return newTrainingData
        })

    }

    const SetProperties = {
        REPS: 'reps',
        KG: 'KG'
    }

    function updateSetValue(property, exerciseName, setIndex, newValue) {
        setTrainingData((oldTrainingData) => {
            const newTrainingData = {...oldTrainingData}
            const targetExercise = newTrainingData.exercises.find(({exercise_name}) => {
                return exercise_name === exerciseName
            })
    
            const targetSet = targetExercise.sets[setIndex];
            
            if (property === 'reps') {
                targetSet.reps = newValue;
            } else {
                targetSet.KG = newValue;
            }
    
            return newTrainingData
        })
    }

    function updateReps(exerciseName, setIndex, newValue) {
        updateSetValue(SetProperties.REPS, exerciseName, setIndex, newValue);
    }
    
    function updateKg(exerciseName, setIndex, newValue) {
        updateSetValue(SetProperties.KG, exerciseName, setIndex, newValue);
    }

    const exportItems = {
        history, 
        exercises, 
        routines, 
        trainingData, 
        addExercise,
        addSet, 
        setTrainingData, 
        startTraining, 
        switchTimer, 
        resetTimer, 
        timer, 
        timerformat, 
        updateReps, 
        updateKg
    }

    return (
        <TrainingContext.Provider value={exportItems}>
            {children}
        </TrainingContext.Provider>
    )
}