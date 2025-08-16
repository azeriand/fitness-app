import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue){

    const [newValue, setNewValue] = useState(defaultValue)

    const modifyCache = (value) => {     
        setNewValue(value);
        localStorage.setItem(key, JSON.stringify(newValue))
    }
    
    useEffect(() => {
        const localStorageValue = localStorage.getItem(key)
        if (localStorageValue !== null) {
            setNewValue(JSON.parse(localStorageValue))
        }
    }, [])

    return [newValue, modifyCache]
}