import SectionName from '../components/common/section-name'
import Card from '../components/common/card'
import FilterByStats from '../components/filter-by-stats'
import CalendarView from '../components/common/calendar-view'
import ChartStats from '../components/chart-stats'

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
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { TrainingContext } from '../components/common/training-context'

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
          <p className='text-start text-[2rem] font-bold m-0'>Stats</p>
          <div className='grid grid-cols-[30%_70%] gap-[1rem] row-span-[100%] h-[calc(100%-3rem)]'>
            <FilterByStats/>
            <ChartStats/>
            {/* <Line options={options} data={data}/> */}
          </div>

      </>
  )
}