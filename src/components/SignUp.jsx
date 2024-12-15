import React, { useState } from 'react';
// import axios from 'axios'; // Assuming you'll use axios for API calls

const Signup = () => {
  const host = "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email format!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    // Prepare data for backend (matching Mongoose model)
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    try {
      // Replace with your actual signup endpoint
      // const response = await axios.post(`${host}/api/auth/signup`, userData);
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const json = await response.json();
      console.log(json);
      if(json.authToken !== undefined) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        window.location.href = '/';
      }else{
          alert('User already exists !');
      }
      // Handle successful signup (e.g., redirect, show success message)
      console.log('Signup successful', response.data);
      
      // Optional: Redirect to login or dashboard
      // window.location.href = '/login';
    } catch (err) {
      // Handle signup errors
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Create an Account</h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required 
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required 
                  minLength="6"
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <small className="form-text text-muted">
                Password must be at least 6 characters long.
              </small>
            </div>
            
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="form-control" 
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required 
                  minLength="6"
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            <div className="mb-3 form-check">
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="termsCheck"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the Terms and Conditions
              </label>
            </div>
            
            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!formData.termsAccepted}
              >
                Create Account
              </button>
            </div>
          </form>
          
          <div className="text-center mt-3">
            <p className="small text-muted">
              Already have an account? <a href="/login" className="text-primary">Log in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;