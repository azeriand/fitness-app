import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);
        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    });

    const modifyCache = (newValue) => {
        setValue((prevValue) => {
            const valueToStore =
                typeof newValue === "function" ? newValue(prevValue) : newValue;
            localStorage.setItem(key, JSON.stringify(valueToStore));
            return valueToStore;
        });
    };

    const removeState = () => {
        setValue(defaultValue);
        localStorage.removeItem(key);
    }

    useEffect(() => {
        const localStorageValue = localStorage.getItem(key);
        if (localStorageValue !== null) {
            setValue(JSON.parse(localStorageValue));
        }
    }, [key]);

    return [value, modifyCache, removeState];
}