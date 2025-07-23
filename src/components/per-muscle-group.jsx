import { PieChart } from '@mui/x-charts/PieChart';
import Card from '../components/common/card'
import Button from '../components/common/button'
import SectionName from './common/section-name'

export default function PerMuscleGroupCard() {
        return(
        <Card noPadding appearance='ghost'>
            <SectionName section='per muscle group' className='pb-[0.5rem] tracking-normal'/>
            <Card noPadding className='p-[1rem] rounded-xl'>
                <div className='grid grid-cols-3 justify-start gap-[0.5rem] text-wrap'>
                    <Button appearance='mate' label='VOLUME' className='w-full rounded-lg'/>
                    <Button appearance='mate' label='TIME' className='w-full rounded-lg'/>
                </div>
                <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: 10, label: 'series A' },
                            { id: 1, value: 15, label: 'series B' },
                            { id: 2, value: 20, label: 'series C' },
                        ],
                        },
                    ]}
                    width={200}
                    height={200}
                />
            </Card>
        </Card>
    )
}