import { useAuthContext } from "./useAuthContext";


export const useLogout = () =>{
    const { dispatch } = useAuthContext()

    const logout = () => {
        //Remove user from Storage
        localStorage.removeItem('user')

        // Dispatch action logout
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}