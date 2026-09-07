import { useSelector } from 'react-redux';

export default function Profile() {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="profile-card">
            <h2>Profile</h2>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
        </div>
    );
}
