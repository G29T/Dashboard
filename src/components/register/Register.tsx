import React, { useState } from 'react';
import { register } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Regular expression to validate the password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
        // Validate the password against the regex
        if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 6 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.'
            );
            return;
        }

        try {
            // Attempt to register the user with the provided email and password
            await register(email, password);
            navigate('/dashboard'); // Redirect to the dashboard upon successful registration
        } catch (err) {
            let errorMessage = (err as Error).message;
            if (errorMessage.startsWith('Firebase: ')) {
                errorMessage = errorMessage.replace('Firebase: ', ''); 
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Create an Account</h2>
            {error && <p className="error-message">{error}</p>}  {/* Display error message if it exists */}
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit" className="auth-button">Register</button>
            </form>
            <p className="auth-footer">
                Already have an account?{' '}
                <button className="auth-link" onClick={() => navigate('/login')}>Sign In</button> {/* Sign In button */}
            </p>
        </div>
    );
};

export default Register;
