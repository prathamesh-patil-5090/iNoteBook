import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    const json = await response.json();
    console.log(json);
    console.log('Login attempt', { email, password });
    if(json.authToken !== undefined) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      window.location.href = '/';
    }else{
        alert('Invalid credentials');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required 
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required 
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            <div className="mb-3 form-check">
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="rememberCheck" 
              />
              <label className="form-check-label" htmlFor="rememberCheck">
                Remember me
              </label>
            </div>
            
            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="text-center mt-3">
            <p className="small text-muted">
              Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;