import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const NameSaver = () => {
    const [name,setName]=useLocalStorage('user-name','')
  return (
    <div>
        <h2>Remember My Name </h2>
        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder='Type your name'
        />
        {name && <h3>Hello, {name}</h3>}

        <p>Refresh the window - your name will still be here!</p>
    </div>
  )
}

export default NameSaver
