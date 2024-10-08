import React, { useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import './LogIn.css'; 

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await login(email, password); // Call the login function with email and password
      navigate('/dashboard');  // Navigate to the dashboard upon successful login
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
      <h2 className="auth-title">Welcome Back</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">Log In</button>
      </form>
      <p className="auth-footer">
        Don't have an account?{' '}
        <button onClick={() => navigate('/register')} className="auth-link">Register</button>
      </p>
    </div>
  );
};

export default Login;
