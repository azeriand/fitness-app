import Card from '../components/common/card'
import SectionName from '../components/common/section-name'
import { useContext } from 'react'
import { TrainingContext } from './common/training-context';

export default function DataRow(){
    const {totalFrequency, lastYearFrequency, lastMonthFrequency, rmWeight} = useContext(TrainingContext)

    return(
        <Card noPadding appearance='ghost' className='grid grid-rows-2 gap-y-[3rem]'>
            <div>
                <SectionName section='frequency' className='pb-[0.5rem] tracking-normal'/>
                <Card noPadding className='grid grid-cols-3 gap-x-[0.5rem] flex-wrap p-[1rem] rounded-xl'>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='total' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{totalFrequency}</div>
                    </Card>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='last year' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{lastYearFrequency}</div>
                    </Card>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='last month' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{lastMonthFrequency}</div>
                    </Card>
                </Card>
            </div>
            <div>
                <SectionName section='weight' className='pb-[0.5rem] tracking-normal'/>
                <Card noPadding className='grid grid-cols-3 gap-x-[0.5rem] flex-wrap p-[1rem] rounded-xl'>
                    <Card noPadding className='content-center justify-items-center'>
                        <SectionName section='rm' className='text-xs tracking-normal'/>
                        <div className='text-xs font-bold'>{rmWeight}</div>
                    </Card>
                </Card>
            </div>
        </Card>
    )
}