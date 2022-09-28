import React from 'react'

export const Navbar = () => {
  return (
    <div className='container-fluid bg-success'>
        <nav className="navbar navbar-success  justify-content-between mx-5 ">
            <div className="navbar-brand">Todo</div>
            <div className='mr-4'>
                <span className='mx-4'>Home</span>
                <span className='mx-4'>Login</span>
                <span className='mx-4'>Signup</span>
            </div>
        </nav>
    </div>
  )
}
