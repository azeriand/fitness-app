import { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();
export default function SettingsContextComponent({children}){

    return(
        <SettingsContext.Provider value={{}}>
            {children}
        </SettingsContext.Provider>
    )

}