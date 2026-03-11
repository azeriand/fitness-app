import { Input, Button } from 'azeriand-library';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { SettingsContext } from '../components/settings-context';
import { LuInfo } from "react-icons/lu";
import useLocalStorage from '../hooks/useLocalStorage';


export default function Settings(){

    const [storedStreak, setStoredStreak] = useLocalStorage('streak', 3);
    const [weightUnit, setWeightUnit] = useLocalStorage('weightUnit', 'KG');
    const [userName, setUserName] = useLocalStorage('userName', 'Azeriand');
    const userNamePlaceholder = 'Edit your user name!';
    const { setDefaultStreak, setDefaultWeightUnit, setDefaultUserName } = useContext(SettingsContext);

    useEffect(() => {
        setDefaultStreak(storedStreak);
    }, [storedStreak, setDefaultStreak]);

    useEffect(() => {
        setDefaultWeightUnit(weightUnit);
    }, [weightUnit, setDefaultWeightUnit]);

    useEffect(() => {
        setDefaultUserName(userName);
    }, [userName, setDefaultUserName]);

    function handleStreakChange(value) {
        const eventValue = parseInt(value);
        setStoredStreak(eventValue)
    }

    function handleUserNameChange(value) {
        setUserName(value);
    }

    return(
        <>
            <Helmet>
                <title>Settings | Fitness App</title>
            </Helmet>
            <p className='text-start text-[2rem] font-bold text-purple-200 m-0'>Settings</p>

            <div className='mt-[2rem] grid grid-col-[100%] justify-start gap-y-[0.5rem]'>
                <p className='font-semibold text-purple-100 text-start'>Edit user name</p>
                <Input type='text' maxLength={20} value={userName} placeholder={userNamePlaceholder} onChange={handleUserNameChange} className='w-50 font-semibold'/>
                <div className= 'text-gray-400 flex items-center ml-[0.5rem] gap-x-[0.25rem]'>
                   <LuInfo/> 
                   <p className='italic text-xs text-purple-100'>Set your user name. *Max 20 characters*</p>
                </div>
            </div>

            <div className='mt-[2rem] grid grid-col-[100%] justify-start gap-y-[0.5rem]'>
                <p className='font-semibold text-purple-100 text-start'>Weekly training days</p>
                <Input type='number' maxLength={5} value={storedStreak} centerText onChange={handleStreakChange} className='w-[5rem] font-semibold'/>
                <div className= 'text-gray-400 flex items-center ml-[0.5rem] gap-x-[0.25rem]'>
                   <LuInfo/> 
                   <p className='italic text-xs text-purple-100'>The default number of weekly training days to keep the streak.</p>
                </div>
            </div>

            <div className='mt-[2rem] grid grid-col-[100%] justify-start gap-y-[0.5rem]'>
                <p className='font-semibold text-start'>Weight unit</p>
                <div className='flex gap-x-[0.5rem]'>
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