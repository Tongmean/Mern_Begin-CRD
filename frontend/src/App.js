import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import { Navbar } from './conponents/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='page'>
          <Routes>
            <Route
              path='/'
              element={<Home/>}
            />
            <Route
              path='/login'
              element={<Login/>}
            />
            <Route
              path='/signup'
              element={<Signup/>}
            />

            
          </Routes>  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
