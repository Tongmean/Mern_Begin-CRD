import React from 'react'
import { Navbar } from '../conponents/Navbar'
import { useEffect } from 'react'
import { useWorkoutsContext } from '../Hook/useWorkoutContext'
import './Home.css'
import AddWorkout from '../conponents/AddWorkout'
const Home = () => {
    //Local hook
    //const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutsContext()
    useEffect(()=>{
        const fetchworkuts = async () => {
            const response = await fetch("http://localhost:8000/api/workouts")
            const json = await response.json()

            if (response.ok){
                //setWorkouts(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchworkuts()
    }, [dispatch])

    // Delete
    const handleDelete = async (_id)=> {
        const response = await fetch(`http://localhost:8000/api/workouts/${_id}`, {
            method: 'DELETE',
        })
        // Have to check again
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
  return (
    <div >
        <Navbar/>
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
                                <i className="fa fa-trash" onClick={()=>{handleDelete(i._id)}}></i>

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