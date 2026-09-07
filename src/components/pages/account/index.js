import { NavLink, Outlet } from 'react-router-dom';

export default function Account() {
    return (
        <div className="page">
            <div className="account-page">
                <nav className="account-nav">
                    <NavLink to="/account/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Profile
                    </NavLink>
                    <NavLink to="/account/posts" className={({ isActive }) => (isActive ? 'active' : '')}>
                        My Posts
                    </NavLink>
                    <NavLink to="/account/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                        New Post
                    </NavLink>
                </nav>
                <div className="account-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
