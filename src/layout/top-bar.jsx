
import Card from '../components/common/card'
import Button from '../components/common/button'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useContext } from 'react'
import { ThemeContext } from '../components/common/theme-context';

export default function TopBar(){

    const {theme, setTheme} = useContext(ThemeContext);

    return(
        <Card appearance='ghost' noPadding fullWidth>
            <Button label='Go to portfolio!'/>
            <Button icon={theme === 'dark' ? <MdLightMode/> : <MdDarkMode/>} onClick={() => setTheme((oldValue) => oldValue === 'dark' ? 'light' : 'dark')}/>
        </Card>
    )
}