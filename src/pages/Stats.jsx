import FilterByStats from '../components/filter-by-stats'
import ChartStats from '../components/chart-stats'
import ExerciseContextComponent from '../components/exercise-context'
import { Helmet } from 'react-helmet';

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
        <Helmet>
          <title>Stats | Fitness App</title>
        </Helmet>
        <ExerciseContextComponent>
          <div className='flex flex-col h-full'>
            <p className='text-start text-[2rem] font-bold text-purple-100 m-0 mb-[2rem]'>Stats</p>
            <div className='grid grid-cols-12 gap-[1rem] flex-1 min-h-0'>
              <div className='col-span-4 min-h-0'>
                <FilterByStats/>
              </div>
              <div className='col-span-8 min-h-0'>
                <ChartStats/>
              </div>
            </div>
          </div>
        </ExerciseContextComponent>

      </>
  )
}