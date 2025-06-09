import Card from '../components/common/card'
import Button from '../components/common/button'
import { TiArrowForward } from "react-icons/ti";


export default function Finished_training(){

    return(
        <Card className='grid w-[33%] items-center justify-self-center'>
            <p className='text-7xl'>🎉</p>
            <p className='font-bold text-2xl'>Well done!</p>
            <Card>

            </Card>
            <Button className='rounded-l'>Share</Button>
            <Button icon={TiArrowForward} position='right' className='rounded-l'>New Training</Button>
        </Card>
    )
}