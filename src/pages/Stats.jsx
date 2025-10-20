import FilterByStats from '../components/filter-by-stats'
import ChartStats from '../components/chart-stats'
import ExerciseContextComponent from '../components/exercise-context'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
import { faker } from '@faker-js/faker';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Chart.js Line Chart',
        },
    },
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        borderColor: 'white',
        backgroundColor: 'white',
      },
    ],
  };

export default function Stats(){ 

  return(
      <>
        <ExerciseContextComponent>
          <p className='text-start text-[2rem] font-bold m-0'>Stats</p>
          <div className='grid grid-cols-[30%_70%] gap-[1rem] row-span-[100%] h-[calc(100%-3rem)] mt-[2rem]'>
            <FilterByStats/>
            <ChartStats/>
            {/* <Line options={options} data={data}/> */}
          </div>
        </ExerciseContextComponent>

      </>
  )
}