import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../../redux/api/authapi';

export default function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [signup, { isLoading, error }] = useSignupMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData).unwrap();
            navigate('/login');
        } catch (err) {
            // error is already surfaced below via the `error` object from the hook
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && <p className="auth-error">{error.data?.message || 'Signup failed.'}</p>}
                <label>
                    Username
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>
                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}
