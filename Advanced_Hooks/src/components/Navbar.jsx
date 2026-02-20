import { useUser } from "../context/UserContext"

export const Navbar=()=>{
    const {user,login,logout}= useUser()
    return(
        <nav style={{background:'#333', color:'white', padding:'12px 14px', display:'flex', justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{margin:'5px'}}>My App</h2>
            <br/>
        
        {user?
        (
            <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
                <span>Welcome {user.name} ({user.role})</span>
                <button 
                onClick={logout} 
                style={{padding:'6px 14px', cursor:'pointer', borderRadius:'4px'}}>
                    Logout
                </button>
            </div>
        ):(
            <button
            onClick={login}
            style={{padding:'6px 14px', cursor:'pointer',
                background:'#0066cc',color:'white', border:'none',borderRadius:'4px'
            }}
            >
                Login
            </button>
        )}
        </nav>
    )
}