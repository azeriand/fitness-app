import { createContext, useContext, useState } from 'react';

const PopupContext = createContext(null);

export function PopupContextComponent({ children }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen }}>
            {children}
        </PopupContext.Provider>
    );
}

export function usePopup(){
    return useContext(PopupContext);
}