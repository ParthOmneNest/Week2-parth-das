import { useState } from "react"

interface SearchProps{
    onSearch:(query:string)=>void
    onFilterChange?:(sector:string)=>void
    placeholder?: string
}
export const SearchBar:React.FC<SearchProps>=({
    onSearch,
    onFilterChange,
    placeholder='Search stocks...'
})=>{
    const [query,setQuery]=useState('')

    // Change Event- typed to a specific HTML element
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value)
        onSearch(e.target.value)
    }

    // KeyboardEvent- access e.key safely
    const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter') onSearch(query)
        if(e.key==='Escape') {setQuery('');onSearch('')}
    }

    // MouseEvent- access e.currentTarget safely
    const handleClear=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setQuery('');
        onSearch('')
    }

    // ChangeEvent for <select>
    const handleSectorChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        if (onFilterChange) onFilterChange(e.target.value)
    }

    return(
        <div style={{display:'flex',gap:8,marginBottom:16}}>
            <input
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{flex:1,padding:8,borderRadius:4}}
            />

            <button onClick={handleClear}>Clear</button>
            {onFilterChange && (
                <select onChange={handleSectorChange}>
                    <option value=''>All Sectors</option>
                    <option value='Technology'>Technology</option>
                    <option value='Finance'>Finance</option>
                    <option value='Automotive'>Automotive</option>
                </select>
            )}
        </div>
    )
}