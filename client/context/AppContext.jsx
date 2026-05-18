import { Children, createContext } from 'react'


const AppContext = createContext();
export const AppProvider = ({children})=>{
    const value={}
    return(
        <AppContext.Provider value={}>
            {children}
        </AppContext.Provider>
    )
}