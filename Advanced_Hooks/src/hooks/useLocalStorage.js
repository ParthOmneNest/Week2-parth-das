import { useState } from "react"

function useLocalStorage(key,initialValue){

    const getSaved=()=>{
        const saved=localStorage.getItem(key)
        if(saved) return JSON.parse(saved)
        return initialValue
    }

    const [value,setValue]=useState(getSaved)
    // custom setter: update React state and save to browser(local storage)
    const saveValue=(newVal)=>{
        setValue(newVal)
        localStorage.setItem(key,JSON.stringify(newVal))
    }
    return [value,saveValue]
}
export default useLocalStorage