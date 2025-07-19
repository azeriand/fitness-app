import Card from '../components/common/card'
import Button from '../components/common/button'
import SectionName from './common/section-name'

export default function VolumeTimeCard(){
    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='volume over time' className='pb-[0.5rem] tracking-normal'/>
            <Card noPadding className='p-[1rem] rounded-xl'>
                <div className='grid grid-cols-3 justify-start gap-[0.5rem] text-wrap'>
                    <Button appearance='mate' label='VOLUME' className='w-full rounded-lg'/>
                    <Button appearance='mate' label='TIME' className='w-full rounded-lg'/>
                </div>
                <div>
                    - Chart Here! -
                </div>
            </Card>
        </Card>
    )
}