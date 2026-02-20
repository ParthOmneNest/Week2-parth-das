import { createContext, useContext, useState } from "react";

// Step 1 : create a context channel
const ThemeContext=createContext(null)

// Step 2: create a Provider component
function ThemeProvider({children}){
    const [theme,setTheme]=useState("light")

    function toggleTheme(){
        setTheme((prev)=>(prev==='light'?"dark":"light"))
    }

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
    // Step 3:a simple hook so components can read the context easily
    function useTheme(){
        return useContext(ThemeContext)
    }

export{ ThemeProvider,useTheme };