import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './Hook/useAuthContext';
import Home from './pages/Home'
import { Navbar } from './conponents/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdateWorkouts from './pages/UpdateWorkouts';
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='page'>
          <Routes>
            <Route
              path='/'
              element={user ? <Home/> : <Navigate to="/login"/>}
            />
            <Route
              path='/login'
              element={!user ?<Login/> : <Navigate to="/"/>}
            />
            <Route
              path='/signup'
              element={!user ? <Signup/>:<Navigate to="/"/> }
            />
            <Route 
              path='/update/:id'
              element={<UpdateWorkouts/>}
            />

            
          </Routes>  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
