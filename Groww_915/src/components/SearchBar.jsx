import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'

const SearchBar = ({handleSearch}) => {
    const[searchTerm,setSearchTerm]=useState('')
    const[isTyping,setIsTyping]=useState(false);

    const timerRef = useRef(null)
    const handleChange=(e)=>{
        const val=e.target.value
        setIsTyping(true)
        setSearchTerm(val)  

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current=setTimeout(()=>{
            setIsTyping(false)
            handleSearch(val)
        },5000)
    }
  return (
    <div>
      <input
      value={searchTerm}
      onChange={handleChange}
      placeholder='Search Products'
      style={{maxWidth:'500px',border:'2px solid black'}}
      />
      <div>
        {isTyping && <p>Searching...</p>}
      </div>
    </div>
  )
}

export default SearchBar