import { useEffect, useRef } from "react"

export const FocusInput=()=>{

    // step 1:- define the ref
    const inputRef=useRef(null)

    // Step2:- define when it must focus
    // when page loads,focus the input
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    return(
        <div style={{padding:'20px'}}>
            <h2>Search Box</h2>

            {/* Step 3:- Define in which element the focus should be,
            Attach the ref to the input element */}
            <input 
            ref={inputRef}
            type="text" placeholder="I am already focused"
            style={{padding:'10px', fontSize:'15px',width:'300px'}} />
        </div>
    )
}