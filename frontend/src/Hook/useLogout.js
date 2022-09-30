import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutContext";

export const useLogout = () =>{
    const { dispatch } = useAuthContext()
    const { dispatch:workoutdispatch } = useWorkoutsContext()

    const logout = () => {
        //Remove user from Storage
        localStorage.removeItem('user')

        // Dispatch action logout
        dispatch({type: 'LOGOUT'})
        workoutdispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}