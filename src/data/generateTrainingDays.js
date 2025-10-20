import exercises from "./exercises.json"
import dayjs from "dayjs";

const routine = [
    ['Chest', 'Biceps'],
    ['Back', 'Triceps'],
    ['Legs', 'Shoulders'],
]

const ratios = {
    Chest: { weight: 0.9, reps: 0.6 },
    Biceps: { weight: 0.4, reps: 1 },
    Back: { weight: 0.7, reps: 0.9 },
    Triceps: { weight: 0.6, reps: 0.8 },
    Legs: { weight: 1, reps: 0.5 },
    Shoulders: { weight: 0.6, reps: 0.8 },
}

const estimateReps = (muscleGroup, set) => {
    const fatigue = set
    const noise = Math.floor(Math.random() * 4) - 2
    return Math.floor(ratios[muscleGroup].reps * 12 - fatigue + noise)
}

const estimateWeight = (muscleGroup, set) => {
    const noise = 0.9 + Math.random() * 0.2;
    return Math.floor(80 * ratios[muscleGroup].weight * (1 + 0.05 * set) * noise)
}

const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);

let dates = [];
let currentWeekStart = new Date(today);
currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)

while (currentWeekStart >= oneYearAgo) {
    let weekDates = [];
    let daysToPick = Math.floor(Math.random() * 2) + 3; // Pick 3, 4, or 5 days
    let chosenDays = new Set();
    
    while (chosenDays.size < daysToPick) {
        let randomDay = Math.floor(Math.random() * 7); // Random day from Sunday to Saturday
        chosenDays.add(randomDay);
    }

    let i = 0;
    
    chosenDays.forEach(dayOffset => {
        let date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + dayOffset);
        if (date <= today) {
            const chosenTraining = routine[i % 3];
            const mainExercises = exercises.filter(exercise => exercise.muscle_type === chosenTraining[0]);
            const auxExercises = exercises.filter(exercise => exercise.sub_muscle.includes(chosenTraining[1]));

            weekDates.push({
                day: date.toISOString().split('T')[0],
                user: 'User Name',
                duration: 2050,
                volume: 4300,
                name: 'Routine Name',
                type: 'Muscle',
                exercises: [
                    {
                        ...mainExercises[Math.floor(Math.random() * mainExercises.length)],
                        sets: [ 
                            { reps: estimateReps(chosenTraining[0], 0), weight: estimateWeight(chosenTraining[0], 0)},
                            { reps: estimateReps(chosenTraining[0], 1), weight: estimateWeight(chosenTraining[0], 1)},
                            { reps: estimateReps(chosenTraining[0], 2), weight: estimateWeight(chosenTraining[0], 2)},
                        ],
                    },
                    {
                        ...mainExercises[Math.floor(Math.random() * mainExercises.length)],
                        sets: [ 
                            { reps: estimateReps(chosenTraining[0], 0), weight: estimateWeight(chosenTraining[0], 0)},
                            { reps: estimateReps(chosenTraining[0], 1), weight: estimateWeight(chosenTraining[0], 1)},
                            { reps: estimateReps(chosenTraining[0], 2), weight: estimateWeight(chosenTraining[0], 2)},
                        ],
                    },
                    {
                        ...mainExercises[Math.floor(Math.random() * mainExercises.length)],
                        sets: [ 
                            { reps: estimateReps(chosenTraining[0], 0), weight: estimateWeight(chosenTraining[0], 0)},
                            { reps: estimateReps(chosenTraining[0], 1), weight: estimateWeight(chosenTraining[0], 1)},
                            { reps: estimateReps(chosenTraining[0], 2), weight: estimateWeight(chosenTraining[0], 2)},
                        ],
                    },
                    {
                        ...auxExercises[Math.floor(Math.random() * auxExercises.length)],
                        sets: [ 
                            { reps: estimateReps(chosenTraining[1], 0), weight: estimateWeight(chosenTraining[1], 0)},
                            { reps: estimateReps(chosenTraining[1], 1), weight: estimateWeight(chosenTraining[1], 1)},
                            { reps: estimateReps(chosenTraining[1], 2), weight: estimateWeight(chosenTraining[1], 2)},
                        ],
                    },
                    {
                        ...auxExercises[Math.floor(Math.random() * auxExercises.length)],
                        sets: [ 
                            { reps: estimateReps(chosenTraining[1], 0), weight: estimateWeight(chosenTraining[1], 0)},
                            { reps: estimateReps(chosenTraining[1], 1), weight: estimateWeight(chosenTraining[1], 1)},
                            { reps: estimateReps(chosenTraining[1], 2), weight: estimateWeight(chosenTraining[1], 2)},
                        ],
                    },
                ]
        });
            i++
        }
    });
    
    dates = dates.concat(weekDates).sort((a, b) => dayjs(a.day).isAfter(dayjs(b.day)) ? -1 : 1);
    currentWeekStart.setDate(currentWeekStart.getDate() - 7); // Move to the previous week
}

export default function() {
    return dates;
}
