import { Calendar, Card, SectionName } from 'azeriand-library'
import { useContext, useEffect, useMemo, useState } from 'react';
import { ExerciseContext } from './exercise-context';
import { TrainingContext } from './training-context';

export function CalendarHistory() {
  
  const {history} = useContext(TrainingContext)
  const {filterSelected} = useContext(ExerciseContext)
  const [filteredExercises, setFilteredExercises] = useState([]);
  // Initialize with current month
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const trainedDays = useMemo(() => filteredExercises.map(exercise => exercise.date), [filteredExercises])
  
  // Handle month change from calendar
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };
  
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

    // Calculate stats for each date and filter by selected month
    return Object.entries(exercisesByDate)
      .map(([date, exercises]) => {
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
      })
      .filter(day => {
        // Filter by selected month and year
        const dayDate = new Date(day.date);
        return dayDate.getMonth() === selectedMonth.getMonth() && 
               dayDate.getFullYear() === selectedMonth.getFullYear();
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10); // Show up to 10 items for the selected month
  }, [filteredExercises, selectedMonth])
  
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
      <>
      <SectionName section="Training History" className="text-lg mb-[1rem]"/>
        <div className="flex gap-[1rem] w-full h-full">
            <div className="flex-1">
                <Card title="Training Calendar" className='h-full'>
                    <Calendar 
                        selectedDates={trainedDays}
                        onMonthChange={handleMonthChange}
                        referenceDate={selectedMonth}
                        views={['day', 'month', 'year']}
                        openTo="day"
                    />
                </Card>
            </div>
            
            <div className="flex-1">
                <Card title={`Training Stats - ${selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}>
                    <div className="space-y-4">
                        <Card noPadding className='p-2'>
                            <div className="flex justify-between items-center font-medium text-gray-300">
                                <span>Date</span>
                                <span>Day RM (kg)</span>
                                <span>Volume (kg)</span>
                            </div>
                        </Card>
                        <div className="space-y-2 max-h-72 overflow-y-auto">
                            {dayStats.length > 0 ? (
                                dayStats.map((day) => (
                                    <div key={day.date} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-700/20 border border-gray-600/20 transition-colors">
                                        <span className="text-sm">
                                            {new Date(day.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <span className="text-sm font-medium">
                                            {day.dayRM > 0 ? `${day.dayRM} kg` : '-'}
                                        </span>
                                        <span className="text-sm">
                                            {day.volume > 0 ? day.volume.toLocaleString() : '-'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400">
                                    <p>No training data for {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                    <p className="text-sm mt-2">Navigate to a different month or check your filter settings</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </>
    );
}