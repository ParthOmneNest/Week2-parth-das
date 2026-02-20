import { useState } from "react"
import { useTheme } from "../context/ThemeContext"

export const ThemePage=()=>{
    const {theme,toggleTheme}=useTheme()

    const bg = theme==="dark"?"#222":"#f5f5f5"
    const color= theme==="dark"?"#fff":"#222"

    return(
        <div style={{background: bg,color:color,minHeight:"100vh",padding:"40px"}}>
            <h1>Current Theme: {theme}</h1>
            <button
            onClick={toggleTheme}
            style={{ padding:"10px 24px", fontSize:"16px", cursor:"pointer",
                borderRadius:"8px",border:"none",
                background: theme==='dark'?'#fff':'#333',
                color: theme ==='dark'?'#333':'#fff'
            }}
            >
                Switch to {theme ==='dark'?'Light':'Dark'} Mode
            </button>
        </div>
    )
}