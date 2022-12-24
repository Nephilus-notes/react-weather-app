
import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { useContext } from 'react';
import Home from "./views/Home"
import Profile from './views/Profile';
import SingleCity from './views/SingleCity'

function App() {
  const { login, user, logout } = useContext(AuthContext)
  // const { pathname } = useLocation()


  return (
    <div className="App">
     <BrowserRouter>
     <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/temps">City Temps</Link>
            </li> */}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {
            (user.loggedIn) ?
          <li><button onClick={ logout } className='button'>Log Out</button></li> :
          <li><button onClick={ login } className='button'>Login</button></li>
          }
          </ul>
        </nav>
          <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/profile' element={ <Profile/> }/>
            <Route path='/temps'>
               <Route path=':cityName' element={ <SingleCity/> }/>
            </Route>
           
          </Routes>

     </BrowserRouter>
    </div>
  );
}

export default App;
