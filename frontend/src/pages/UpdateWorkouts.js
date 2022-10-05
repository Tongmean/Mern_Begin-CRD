import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { useWorkoutsContext } from '../Hook/useWorkoutContext'
import { useAuthContext } from '../Hook/useAuthContext'
const UpdateWorkouts = () => {
    const { id } = useParams()
    const {user} = useAuthContext()
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState('')
    const [update, setUpdate] = useState([])
    const  history  = useNavigate()
    const handlesubmit = async (e) =>{
        e.preventDefault()

        //Check user login

        if(!user){
            setError('You must be logged in')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        // message from backend
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            console.log(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            // setTitle('')
            // setLoad('')
            // setReps('')
            setError(null)
            setEmptyFields([])
            console.log('Updated', json)
            dispatch({type: 'UPDATE_WORKOUT', payload: json})
            history("/")
        }
        
    }
    useEffect(()=>{
        const fetchworkout = async () =>{
            const response = await fetch(`http://localhost:8000/api/workouts/${ id }`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const update = await response.json()
            setUpdate([update])
        }
        if(user){
            fetchworkout()
        }
    }, [user, id])
  return (
    <div className='container d-flex justify-content-center'>
        <form onSubmit={handlesubmit}  className='w-50 mt-5'>
            {update.map((i, index)=>(
                <div key={index}>
                    <div>
                        <label>Title</label>
                        <input type="text" className={emptyFields.includes('title') ? 'error form-control':'form-control'}  onChange={(e)=> {setTitle(e.target.value)}} defaultValue={i.title}></input>
                    </div>
                    <div>
                        <label>Load</label>
                        <input type="number" className={emptyFields.includes('Load') ? 'error form-control':'form-control'} onChange={(e)=>{setLoad(e.target.value)}} defaultValue={i.load}></input>
                    </div>
                    <div>
                        <label>Reps</label>
                        <input type="number" className={emptyFields.includes('reps') ? 'error form-control':'form-control'} onChange={(e)=>{setReps(e.target.value)}} defaultValue={i.reps}></input>
                    </div>
                    <button type='submit' className='btn btn-primary w-25 mt-4'>Update</button>
                    {error && <div className='error'>{error}</div>}
                </div>
            ))}
        </form>
    </div>
  )
}

export default UpdateWorkouts
