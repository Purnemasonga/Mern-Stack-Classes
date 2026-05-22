//rafce - react arrow function component with export default

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Values:", formData);
    toast.success("Registration Successful!");
    navigate('/home');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  className="form-control" 
                  value={formData.fullName}
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  value={formData.email}
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  value={formData.password}
                  onChange={handleChange} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <div className="mt-3 text-center">
              <p>Already have an account? <button className="btn btn-link p-0" onClick={() => navigate('/login')}>Login</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;