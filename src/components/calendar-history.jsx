import { Calendar } from 'azeriand-library'
import { useContext, useEffect, useMemo, useState } from 'react';
import { ExerciseContext } from './exercise-context';
import { TrainingContext } from './training-context';

export function CalendarHistory() {
  
  const {history} = useContext(TrainingContext)
  const {filterSelected} = useContext(ExerciseContext)
  const [filteredExercises, setFilteredExercises] = useState([]);

  const trainedDays = useMemo(() => filteredExercises.map(exercise => exercise.date), [filteredExercises])
  
  // Calculate day stats for the table
  const dayStats = useMemo(() => {
    // Group filtered exercises by date
    const exercisesByDate = filteredExercises.reduce((acc, exercise) => {
      const date = exercise.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(exercise);
      return acc;
    }, {});

    // Calculate stats for each date
    return Object.entries(exercisesByDate).map(([date, exercises]) => {
      let maxWeight = 0;
      let totalVolume = 0;
      
      exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
          const weight = parseFloat(set.weight || set.KG || 0);
          const reps = parseFloat(set.reps || 0);
          
          // Update max weight (Day RM)
          if (weight > maxWeight) {
            maxWeight = weight;
          }
          
          // Calculate volume (weight × reps)
          totalVolume += weight * reps;
        });
      });
      
      return {
        date: date,
        dayRM: maxWeight,
        volume: Math.round(totalVolume)
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7); // Sort by date descending and limit to 7 items
  }, [filteredExercises])
  
  function getChartData() {
    let exercisesList = [];
    let filterFn = () => true;

    const filterFnMapper = {
      'muscle_group': (exercise) => exercise.muscle_type === filterSelected.name,
      'exercise': (exercise) => exercise.exercise_name === filterSelected.name
    }

    if (filterSelected) {
      filterFn = filterFnMapper[filterSelected.type];
    }

    history.forEach((day) => {
    const exercisesFound = day.exercises.filter(filterFn);
    exercisesList = [...exercisesList, ...exercisesFound.map(ex => ({...ex, date: day.day}))];
    })

    console.log(exercisesList);
    
    setFilteredExercises(exercisesList);
  }

    useEffect(getChartData, [filterSelected, history])
    return (
        <div className="flex gap-8 w-full">
            <div className="flex-1">
                <Calendar selectedDates={trainedDays}/>
            </div>
            
            <div className="flex-1">
                <div className="border rounded-lg">
                    <table className="w-full table-auto">
                        <thead className="sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left border-b">Date</th>
                                <th className="px-4 py-2 text-left border-b">Day RM (kg)</th>
                                <th className="px-4 py-2 text-left border-b">Volume (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dayStats.map((day) => (
                                <tr key={day.date}>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {new Date(day.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm font-medium">
                                        {day.dayRM}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm">
                                        {day.volume.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}