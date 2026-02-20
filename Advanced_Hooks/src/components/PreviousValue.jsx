import { useEffect, useRef, useState } from "react"

export const PreviousValue=()=>{
    const [name,setName]=useState("")

    // useRef stores the previous value silently - no re-render
    const prevName=useRef("")

    useEffect(()=>{
        prevName.current=name // after ech render, save current as previous
    })
    return(
        <div style={{padding:"20px"}}>
            <h2>Track Previous Value</h2>
            <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Type Your Name here"
            style={{padding:'8px',fontSize:'16px'}}
            />
            <p>Current: <strong>{name}</strong></p>
            <p>Previous: <strong>{prevName.current}</strong></p>
            
        </div>
    )
}