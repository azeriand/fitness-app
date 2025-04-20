import { useState, createContext } from 'react'

export const ThemeContext = createContext(); //Creando el 'espacio compartido' al que los componentes pueden acceder??

export default function ThemeContextComponent({children}){

    const [theme, setTheme] = useState('dark')

    //Creando el componente donde todos los hijos pueden acceder al contexto (siendo children los props)
    return(
        <ThemeContext.Provider value={{theme, setTheme}}> 
            {children}
        </ThemeContext.Provider>
    )
}