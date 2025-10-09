
import { Card, Button, ThemeContext } from 'azeriand-library'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useContext } from 'react'

export default function TopBar(){

    const {theme, setTheme} = useContext(ThemeContext);

    return(
        <Card className='w-full flex justify-end gap-[1rem] mb-[1rem] items-center' appearance='ghost' noPadding>
            <Button label='Go to my portfolio!' className='h-full'/>
            <Button icon={theme === 'dark' ? <MdLightMode/> : <MdDarkMode/>} onClick={() => setTheme((oldValue) => oldValue === 'dark' ? 'light' : 'dark')}/>
        </Card>
    )
}