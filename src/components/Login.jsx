import React, { useState } from 'react';
import Alert from './Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    console.log(json);
    console.log('Login attempt', { email, password });
    if(json.authToken !== undefined) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      setAlert({ type: 'success', msg: 'Logged in successfully!' });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } else {
      setAlert({ type: 'danger', msg: 'Invalid credentials' });
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center">Login</h3>
          <Alert alert={alert} />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">Show Password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;