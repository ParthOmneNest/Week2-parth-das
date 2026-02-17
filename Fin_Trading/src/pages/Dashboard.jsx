import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Portfolio } from "../components/Portfolio"
import { useState } from "react"
import { Products } from "./Products"
export const Dashboard=()=>{
      
      const [showPortFolio,setShowPortFolio]=useState(false)
        const name="Parth"
        const value=20000
        const image=`https://robohash.org/${name}`
    
        if(showPortFolio){
          return (
            <Portfolio
            name={name}
            image={image}
            value={value}
            onBack={()=>setShowPortFolio(false)}
            />
          )
        }
          
        return(
          <>
            <Header/>
            <img src={image} alt="" />
            <p>Name:{name}</p>
            <p>Value:{value}</p>
            <Products/>
            <button onClick={()=>setShowPortFolio(true)}>Show PortFolio</button>
            <Footer/>
          </>
        )
}