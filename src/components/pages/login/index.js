import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../redux/api/authapi';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData).unwrap();
            navigate('/');
        } catch (err) {
            // error is already surfaced below via the `error` object from the hook
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="auth-error">{error.data?.message || 'Login failed.'}</p>}
                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
}
