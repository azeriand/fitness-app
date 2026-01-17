import { Card } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useContext, useEffect, useState } from 'react';
import { ExerciseContext } from './exercise-context';
import { TrainingContext } from './training-context';

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
      width: 60,
    },
  ],
  height: 300,
};

export default function RepsVsWeightCard() {

  const {history} = useContext(TrainingContext)
  const {filterSelected} = useContext(ExerciseContext)
  const [dataChart, setdataChart] = useState([]);

  function getChartData() {
    let chartData = [];
    let exercisesList =[];
    let sortedChartData = [];
    
    if (filterSelected && filterSelected.type === 'exercise') {
      history.forEach((day) => {
        const exercisesFound = day.exercises.filter((exercise) => exercise.exercise_name === filterSelected.name)
        exercisesList = [...exercisesList, ...exercisesFound];
      })
      chartData = exercisesList.flatMap((exercise) => exercise.sets)
    }
    sortedChartData = chartData.sort((a, b) => (a.reps * a.weight) - (b.reps * b.weight));
    setdataChart(sortedChartData);

  }

  useEffect(getChartData, [filterSelected])

  return(
      <Card noPadding appearance='ghost'>
          <SectionName section='reps vs weight' className='pb-[0.5rem] tracking-normal'/>
          {
            dataChart.length !== 0 &&
          <Card noPadding className='p-[1rem] rounded-xl'>
              <ScatterChart
                  dataset={dataChart}
                  series={[
                      { datasetKeys: { id: 'version', x: 'weight', y: 'reps' }, label: 'Series A' },
                  ]}
                  {...chartSetting}
              />
          </Card>
          }
      </Card>
  )
}
