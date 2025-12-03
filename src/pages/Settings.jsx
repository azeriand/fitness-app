import { Input, Button } from 'azeriand-library';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { SettingsContext } from '../components/settings-context';
import { LuInfo } from "react-icons/lu";
import useLocalStorage from '../hooks/useLocalStorage';


export default function Settings(){

    const [storedStreak, setStoredStreak] = useLocalStorage('streak', 3);
    const [weightUnit, setWeightUnit] = useLocalStorage('weightUnit', 'KG');

    const { setDefaultStreak, setDefaultWeightUnit } = useContext(SettingsContext);

    useEffect(() => {
        setDefaultStreak(storedStreak);
    }, [storedStreak, setDefaultStreak]);

    useEffect(() => {
        setDefaultWeightUnit(weightUnit);
    }, [weightUnit, setDefaultWeightUnit]);

    function handleChange(value) {
        const eventValue = parseInt(value);
        setStoredStreak(eventValue)
    }

    return(
        <>
            <Helmet>
                <title>Settings | Fitness App</title>
            </Helmet>
            <p className='text-start text-[2rem] font-bold m-0'>Settings</p>
            <div className='mt-[2rem] grid grid-col-[100%] justify-start gap-y-[0.5rem]'>
                <p className='font-semibold text-start'>Weekly training days</p>
                <Input type='number' maxLength={5} value={storedStreak} centerText onChange={handleChange} className='w-[5rem] font-semibold'/>
                <div className= 'text-gray-400 flex items-center ml-[0.5rem] gap-x-[0.25rem]'>
                   <LuInfo/> 
                   <p className='italic text-xs'>The default number of weekly training days to keep the streak.</p>
                </div>
            </div>
            <div className='mt-[2rem] grid grid-col-[100%] justify-start gap-y-[0.5rem]'>
                <p className='font-semibold text-start'>Weight unit</p>
                <div className='flex'>
                    <Button label='KG' onClick={() => setWeightUnit('KG')}/>
                    <Button label='IBS' onClick={() => setWeightUnit('IBS')}/>
                </div>
                <div className= 'text-gray-400 flex items-center ml-[0.5rem] gap-x-[0.25rem]'>
                   <LuInfo/> 
                   <p className='italic text-xs'>Set the default weight unit.</p>
                </div>
            </div>


        </>
    )
}