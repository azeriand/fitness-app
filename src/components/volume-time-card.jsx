import Card from '../components/common/card'
import Button from '../components/common/button'

export default function VolumeTimeCard(){
    return(
        <Card>
            <div className='flex justify-start gap-[1rem] w-[50%]'>
                <Button appearance='mate' label='VOLUME' className='w-full'/>
                <Button appearance='mate' label='TIME' className='w-full'/>
            </div>
            <div>
                - Chart Here! -
            </div>
        </Card>
    )
}