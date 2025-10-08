
import { Card } from 'azeriand-library'
import { useContext } from 'react'
import { TrainingContext } from './training-context'
import PlayPause from './play-pause';

export default function TimeController({appearance}){
    
    const {timerformat} = useContext(TrainingContext)

    return(
        <Card className='w-fit' noPadding appearance={appearance}>
            <div className='flex items-center justify-between p-[0.5rem] gap-x-[0.5rem]'>
                <div className='text-[1.5rem] font-bold'>{timerformat}</div>
                <PlayPause/>
            </div>
        </Card>
    )
}