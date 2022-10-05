import { createContext, useReducer } from "react";

// Create new Context
export const WorkoutsContext = createContext()


// Reducer Function condition
export const worksReducer = (state, action) =>{
    switch (action.type){
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts : [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT':
            return{
                workouts: state.workouts.map((i)=> i._id = action.payload._id ? (
                    i._id = action.payload._id,
                    i.load = action.payload.load,
                    i.reps = action.payload.reps
                
                ):(state)
            )}
        default:
            return state
    }
}

// Function of context Provider
export const WorkoutsContextProvider = ({ children }) =>{
    //Create userreducer
    const [state, dispatch] = useReducer(worksReducer, {
        //initial value
        workouts:null
    })

    //dispatch({type: 'SET_WORKOUTS', payload: [{},{}]})

    return(
                                        // Invoke Reducer
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )

}