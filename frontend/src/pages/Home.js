import React from 'react'
import { useEffect } from 'react'
import { useWorkoutsContext } from '../Hook/useWorkoutContext'
import './Home.css'
import AddWorkout from '../conponents/AddWorkout'
import { useAuthContext } from '../Hook/useAuthContext'
import {Link } from 'react-router-dom'
const Home = () => {
    //Local hook
    //const [workouts, setWorkouts] = useState(null)
    const { user } = useAuthContext()
    const {workouts, dispatch} = useWorkoutsContext()
    useEffect(()=>{
        const fetchworkuts = async () => {
            const response = await fetch("http://localhost:8000/api/workouts", {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                //setWorkouts(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if(user){
            fetchworkuts()
        }
        
    }, [dispatch, user])

    // Delete
    const handleDelete = async (_id)=> {
        const response = await fetch(`http://localhost:8000/api/workouts/${_id}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        if(!user){
            return
        }
        // Have to check again
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
  return (
    <div >
        <div className='row container-fluid'>
            <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12'>
                <div>
                    {workouts && workouts.map((i,index) =>(
                        <div key = {i._id} className="item d-flex justify-content-between">
                
                            <div>
                                <span><p>Item_ID : {i._id}</p></span>
                                <p>Item_Tittle : {i.title}</p>
                                <p>Load : {i.load}</p>
                                <p>Reps : {i.reps}</p>
                                <p>Create At : {i.createdAt}</p>
                            </div>
                            <div className='Delete-icon pe-3'>
                                <div>
                                    <i className="fa fa-trash" onClick={()=>{handleDelete(i._id)}}></i>
                                </div>
                                
                                <div>
                                    <Link to={`/update/${i._id}`}>
                                        <button className='btn btn-primary me-2'>Update</button>
                                    </Link>
                                    
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12'>
                <div className='Addworkout'>
                    <AddWorkout/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home