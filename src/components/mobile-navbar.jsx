import { useNavigate } from 'react-router-dom'
import { Card } from 'azeriand-library'
import { FaDumbbell, FaPlay } from 'react-icons/fa'
import { FaChartSimple } from 'react-icons/fa6'

export default function MobileNavbar(){
    const navigate = useNavigate()

    return(
        <Card noPadding className='rounded-4xl grid grid-cols-3 text-[1.5rem] font-bold justify-items-center p-[1rem] mt-[1rem] fixed bottom-[1rem] left-[1rem] right-[1rem]'>
            <div className='justify-items-center' onClick={() => navigate('/routines')}>
                <FaDumbbell/>
                Routines
            </div>

            <div className='justify-items-center' onClick={() => navigate('/training')}>
                <FaPlay/>
                Train
            </div>

            <div className='justify-items-center' onClick={() => navigate('/stats')}>
                <FaChartSimple/>
                Stats
            </div>
        </Card>
    )
}