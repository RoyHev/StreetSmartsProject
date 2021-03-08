import React from 'react'
import './App.css'
import {Link} from 'react-router-dom';

function Nav () {
  
    return (
     <nav>
         <h3>LOGO</h3>
         <ul>
             <Link to='/admin'>
             <li>Admin</li>
             </Link>
         </ul>
     </nav>
    );
  
  
}
export default Nav;