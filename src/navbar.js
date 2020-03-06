import React from 'react'
import { Link } from 'react-router-dom'
import PlayDB from './config/playDB'


const Nav = () => {
  const handleLogOut = () => {
    PlayDB.auth().signOut();
  }

  return (
    <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to='/' className="brand-logo">Win Radio</Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to='/upload'>Upload</Link></li>
            <li><Link to='/programs'>Programs</Link></li>
            <li><Link to='/schedule'>Schedule</Link></li>
            <li><Link to='/contents'>Contents</Link></li>
            <li><Link to='/test'>Test</Link></li>
            <li><Link to='/replay'>Replay</Link></li>
            <li onClick={ handleLogOut }><Link to='/'>Logout</Link></li>
          </ul>
        </div>
      </nav>
  )
}

export default Nav;
