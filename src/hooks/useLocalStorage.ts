import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue){

    const [value, setValue] = useState(defaultValue)

    const modifyCache = (newValue) => {     
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue))
    }
    
    useEffect(() => {
        const localStorageValue = localStorage.getItem(key)
        if (localStorageValue !== null) {
            setValue(JSON.parse(localStorageValue))
        }
    }, [])

    return [value, modifyCache]
}