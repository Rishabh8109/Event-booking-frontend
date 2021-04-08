import React  from 'react';
import {NavLink} from 'react-router-dom';
import '../../App.css';
import {useHistory} from 'react-router-dom';


function Navbar() {
  const token = localStorage.getItem('token');
  const history = useHistory();

  // Logout
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    history.go(0);
  }
  return (
    <header>
       <div className="main_navigation_logo">
          <h3>EasyEvent</h3>
       </div>
       <nav>
          <ul>
            <li>
             <NavLink to="/events">
                 Event
             </NavLink>
            </li>
            <li style={{display : !token ? 'none' : 'block'}}>
             <NavLink to="/bookings">
                Booking
             </NavLink>
            </li>
            <li style={{display : token ? 'none' : 'block'}}>
             <NavLink to="/auth">
                Authenticate
             </NavLink>
            </li>
            <li style={{display : token ? 'block' : 'none'}} onClick={logout}>
                Logout
            </li>
          </ul>
       </nav>
    </header>
  )
}

export default Navbar;
