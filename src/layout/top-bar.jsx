
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import { Card, Button, Avatar, ThemeContext } from 'azeriand-library'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdSettings } from 'react-icons/io';
import { FaDumbbell } from 'react-icons/fa';
import { useContext } from 'react'
import Goku from '../assets/goku2.jpg'

export default function TopBar(){

    const {theme, setTheme} = useContext(ThemeContext);
    const isMobile = useMediaQuery({ query: '(max-width: 48rem)' });
    const navigate = useNavigate();

    return(
        <Card intensity={900} blur={40} color='purple' noPadding className='w-full flex justify-between gap-[1rem] mb-[1rem] p-[1rem] items-center rounded-xl'>
            <div className='md:!hidden text-[2rem]' onClick={() => navigate('/')}><FaDumbbell/></div>
            <div className='flex gap-[1rem] items-center'>
                <Button label='Go to my portfolio!' className='h-full'/>
                <Button icon={<IoMdSettings/>} onClick={() => navigate('/settings')} className='md:!hidden'/>
                <Avatar className='md:!hidden' src={Goku}/>
                <Button icon={theme === 'dark' ? <MdLightMode/> : <MdDarkMode/>} onClick={() => setTheme((oldValue) => oldValue === 'dark' ? 'light' : 'dark')} className={isMobile? '!hidden' : ''}/>
            </div>
        </Card>
    )
}