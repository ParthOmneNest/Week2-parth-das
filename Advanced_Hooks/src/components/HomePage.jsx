import { useUser } from "../context/UserContext"

export const HomePage=()=>{
    const {user}=useUser()
    return(
        <div style={{padding:"40px"}}>
        {user?(
            <h2>Hello, {user.name}! You are logged in as {user.role}</h2>
        ):(
            <h2>Please log in using the button above</h2>
        )}
        </div>
    )
}