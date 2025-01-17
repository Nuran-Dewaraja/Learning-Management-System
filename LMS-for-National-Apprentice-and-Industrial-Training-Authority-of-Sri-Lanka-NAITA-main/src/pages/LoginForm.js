import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:1212/api/login', null, {
        params: {
          email: email,
          password: password,
        },
      });
  
      const user = response.data; 
  
      if (user && (user.role === 'admin' || user.role === 'student' || user.role === 'lecturer')) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', user.role);
        localStorage.setItem('course', user.course); 

        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
        
          case 'student':
            if (user.course === 'ICT') {
              navigate('/student/ict');
            } else if (user.course === 'Hotel Sector') {
              navigate('/student/hotel');
            } else if (user.course === 'Automobile Mechanic') {
              navigate('/student/auto');
            } else if (user.course === 'Software Engineering') {
              navigate('/student/se');
            } else if (user.course === 'Electrical Technician') {
              navigate('/student/et');
            } else {
              setErrorMessage('Course not recognized for student');
            }
            break;
        
          case 'lecturer':
            if (user.course === 'ICT') {
              navigate('/ict-list');
            } else if (user.course === 'Hotel Sector') {
              navigate('/hotel-list');
            } else if (user.course === 'Automobile Mechanic') {
              navigate('/auto-list');
            } else if (user.course === 'Software Engineering') {
              navigate('/se-list');
            } else if (user.course === 'Electrical Technician') {
              navigate('/et-list');
            } else {
              setErrorMessage('Course not recognized for lecturer');
            }
            break;
        
          default:
            setErrorMessage('Invalid user role');
            break;
        }
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid email or password');
    }
  };
  

  return (
    <div className="d-flex align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 pe-5"> 
            <img src="login.svg" alt="Login illustration" className="img-fluid" />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="w-100">
              <div className="text-left mb-4">
                <img src="logo512.png" alt="Logo" className="mb-3" style={{ width: '100px' }} />
                <h4 className="mb-1">National Apprentice and Industrial Training Authority</h4>
                <h5 className="text-muted mb-3">Learning Management System</h5>
              </div>
              <h3 className="mb-4">Sign In</h3>
              <p className="text-muted mb-4">Please enter your credentials to log in.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ maxWidth: '300px' }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ maxWidth: '300px' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '300px' }}>Log In</button>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;