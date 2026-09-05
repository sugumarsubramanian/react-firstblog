import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
        <Link to="/" className="logo">MyBlog</Link>
        <ul className="nav-menu">
            <li>
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/posts" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Posts
                </NavLink>
            </li>
            {/* <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li> */}
        </ul>
    </header>
  )
}

export default Header
