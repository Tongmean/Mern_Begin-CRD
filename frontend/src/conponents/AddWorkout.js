import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../Hook/useWorkoutContext'
import './Addworkout.css'
const AddWorkout = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState('')
    const handlesubmit = async (e) =>{
        e.preventDefault()
        const workout = {title, load, reps}

        const response = await fetch('http://localhost:8000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json'
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
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }

    }

  return (
    <div className=''>
        <form onSubmit={handlesubmit}>
            <div>
                <label>Title</label>
                <input type="text" className={emptyFields.includes('title') ? 'error form-control':'form-control'}  onChange={(e)=> {setTitle(e.target.value)}} value={title}></input>
            </div>
            <div>
                <label>Load</label>
                <input type="number" className={emptyFields.includes('Load') ? 'error form-control':'form-control'} onChange={(e)=>{setLoad(e.target.value)}} value={load}></input>
            </div>
            <div>
                <label>Reps</label>
                <input type="number" className={emptyFields.includes('reps') ? 'error form-control':'form-control'} onChange={(e)=>{setReps(e.target.value)}} value={reps}></input>
            </div>
            <button type='submit' className='btn btn-primary w-25 mt-4'>Save</button>
            {error && <div className='error'>{error}</div>}
        </form>
    </div>
  )
}

export default AddWorkout