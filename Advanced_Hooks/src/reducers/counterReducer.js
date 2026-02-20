const ACTIONS={
    INCREMENT:'INCREMENT',
    DECREMENT:'DECREMENT',
    RESET:'RESET'
}
// reducer takes current state+action, returns new state
// state = current number: 5
// action: {type: "INCREMENT"}

const counterReducer=(state,action)=>{
    if(action.type===ACTIONS.INCREMENT) return state+1
    if(action.type===ACTIONS.DECREMENT) return state-1
    if(action.type===ACTIONS.RESET) return 0
    return state
}

export {counterReducer,ACTIONS}