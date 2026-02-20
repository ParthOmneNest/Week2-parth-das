import { useReducer } from 'react'
import { counterReducer, ACTIONS } from '../reducers/counterReducer'

export const Counter = () => {
    const [count,dispatch]=useReducer(counterReducer,0)
  return (
    <div>
      <h2>Counter</h2>
      <p>{count}</p>

      <div>
        <button onClick={()=>dispatch({type:ACTIONS.INCREMENT})}>+</button>
        <button onClick={()=>dispatch({type:ACTIONS.DECREMENT})}>-</button>
        <button onClick={()=>dispatch({type:ACTIONS.RESET})}>Reset</button>
      </div>
    </div>
  )
}

