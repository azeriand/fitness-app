import { Card } from 'azeriand-library'
import { CalendarHistory } from './calendar-history'
import DataRow from './data-row'
import VolumeTimeCard from './volume-time-card'
import { useContext, useEffect } from 'react'
import { ExerciseContext } from './exercise-context';
import charts from '../data/charts';
import PerMuscleGroupCard from './per-muscle-group'
import RepsVsWeightCard from './reps-vs-weight'
import EstimateTraining from './estimate-training'

export default function ChartStats(){

    const componentMapping = {
        'calendar': <CalendarHistory/>,
        'data_row': <DataRow/>,
        'volume_time_card': <VolumeTimeCard/>,
        'per_muscle_group': <PerMuscleGroupCard/>,
        'reps_vs_weight': <RepsVsWeightCard/>,
        'estimate_training': <EstimateTraining/>,
    }

    const {filterSelected, searchValue} = useContext(ExerciseContext)

    useEffect(() => {
    }, [filterSelected]);

    const customScrollbar = "overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"

    return(
        <Card noPadding appearance='ghost' className={`grid grid-cols-1 md:grid-cols-2 gap-[1rem] w-full h-full overflow-y-auto ${customScrollbar}`}>
          {

            charts.map((chart) => (chart.type.includes(filterSelected && filterSelected.type) || (chart.type.includes('no_selected') && (!filterSelected || searchValue === ''))) &&
            <div key={chart.component_name} className={chart.full_width ? 'col-span-1 md:col-span-2' : ''}>
              <Card noPadding appearance='ghost'>
                {componentMapping[chart.component_name]}
              </Card>
            </div>
            )
          }
      </Card>
    )
}