import { createContext, useContext, useState } from "react";

// Step 1 : create a context channel
const UserContext=createContext(null)

// Step 2: create a Provider component
function UserProvider({children}){
    const [user,setUser]=useState(null)

    function login(){
        setUser({name:'Parth',role:'Admin'})
    }
    function logout(){
        setUser(null)
    }

    return(
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
    // Step 3:a simple hook so components can read the context easily
    function useUser(){
        return useContext(UserContext)
    }

export{ UserProvider,useUser };