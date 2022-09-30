import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../Hook/useLogout'
import { useAuthContext } from '../Hook/useAuthContext'
import './Navbar.css'
export const Navbar = () => {
  const { user } = useAuthContext()
  const {logout } = useLogout()
  const handleClick =()=>{
    logout()
  }
  return (
    <div className='container-fluid bg-success'>
        <nav className="navbar navbar-success  justify-content-between mx-5 ">
            <div className="navbar-brand">Todo</div>
            <div className='mr-4'>
                {user && (
                  <Link to="/">
                    <span className='mx-4 home'>Home</span>
                  </Link>
                )}
                {!user && (
                  <>
                    <Link to="/login">
                    <span className='mx-4'>Login</span>
                    </Link>
                    <Link to="/signup">
                      <span className='mx-4'>Signup</span>
                    </Link>
                  </>
                )}
                {user && (
                  <>
                    <span style={{color:"white"}} onClick={handleClick}>
                      <a href>logout</a>
                    </span>
                    <span className='ms-4'>
                      {user.email}
                    </span>
                  </>
                )}
                
            </div>
        </nav>
    </div>
  )
}
