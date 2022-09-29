import React from 'react'
import { useState } from 'react'
import { useSignup } from '../Hook/useSignup'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {error, isloading, signup} = useSignup()
    const handleClick = async (e) =>{
        e.preventDefault()

        await signup(email, password)
        setEmail('')
        setPassword('')
    }
  return (
    <div className='h-100 d-flex justify-content-center mt-5'>
        <form className='w-50'>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    className='form-control'
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type='password'
                    className='form-control'
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                />
            </div>
            <div>
                <button type='submit' disabled={isloading} className='btn btn-secondary' onClick={handleClick}>Signup</button>
            </div>
            { error && <div className='error'>{error}</div>}
            
        </form>
      
    </div>
  )
}

export default Signup
