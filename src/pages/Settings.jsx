import { Input } from 'azeriand-library'
import { useContext, useEffect } from 'react'
import { SettingsContext } from '../components/settings-context'
import { LuInfo } from "react-icons/lu";
import useLocalStorage from '../hooks/useLocalStorage'


export default function Settings(){

    const [storedStreak, setStoredStreak] = useLocalStorage('streak', 3);
    const {setDefaultStreak} = useContext(SettingsContext)

    useEffect(() => {
        setDefaultStreak(storedStreak)
    }, [storedStreak, setDefaultStreak])

    function handleChange(value) {
        const eventValue = parseInt(value);
        setDefaultStreak(eventValue)
        setStoredStreak(eventValue)

    }


    return(
        <>
            <p className='text-start text-[2rem] font-bold m-0'>Settings</p>
            <div className='mt-[2rem] grid grid-col-[100%] justify-start gap-y-[0.5rem]'>
                <p className='font-semibold text-start'>Weekly training days</p>
                <Input type='number' size={5} maxLength={5} value={storedStreak} onChange={handleChange}/>
                <div className= 'text-gray-400 flex items-center ml-[0.5rem] gap-x-[0.25rem]'>
                   <LuInfo/> 
                   <p>The default number of weekly training days to keep the streak.</p>
                </div>
            </div>

        </>
    )
}