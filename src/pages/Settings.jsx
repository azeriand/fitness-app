import { Card } from 'azeriand-library'
import Input from '../components/common/input'
import { useContext, useEffect } from 'react'
import { SettingsContext } from '../components/settings-context'
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
            <h1>SETTINGS</h1>
            <div className='mt-[1rem] flex flex-start'>
                <p>The default number of training days to count the week as a streak:</p>
                <Input type='number' min={0} value={storedStreak} onChange={handleChange}/>
            </div>

        </>
    )
}