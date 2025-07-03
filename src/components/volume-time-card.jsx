import Card from '../components/common/card'
import Button from '../components/common/button'

export default function VolumeTimeCard(){
    return(
        <Card noPadding>
            <div className='flex justify-start gap-[1rem]'>
                <Button noPadding appearance='mate' label='VOLUME' className='p-[3rem]'/>
                <Button noPadding appearance='mate' label='TIME' className='p-[3rem]'/>
            </div>
            <div>
                - Chart Here! -
            </div>
        </Card>
    )
}