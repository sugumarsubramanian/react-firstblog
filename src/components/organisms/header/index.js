import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
  };

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
            {user ? (
                <>
                    <li>
                        <NavLink to="/account/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Account
                        </NavLink>
                    </li>
                    <li>
                        <button type="button" className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Sign Up
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    </header>
  )
}

export default Header
