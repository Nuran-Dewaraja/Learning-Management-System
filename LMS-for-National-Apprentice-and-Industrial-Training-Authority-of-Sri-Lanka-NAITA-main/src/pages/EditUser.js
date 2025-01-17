import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Book, UserCog, CircleUser, MapPinHouse, IdCard, CalendarFold, Phone } from 'lucide-react';

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;

  const [name, setName] = useState(user.name);
  const [nic, setNIC] = useState(user.nic);
  const [contact, setContact] = useState(user.contact);
  const [dob, setDob] = useState(user.dob);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState(user.password); 
  const [course, setCourse] = useState(user.course || '0');

  const courses = ["ICT", "Software Engineering", "Hotel Sector", "Automobile Mechanic", "Electrical Technician"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      email,
      password,
      role,
      address,
      name,
      nic,
      contact,
      dob,
      course: role === 'lecturer' || role === 'student' ? course : '0' 
    };

    axios.put(`http://localhost:1212/api/edit-user/${user.id}`, updatedUser)
      .then(response => {
        alert("User updated successfully");
        navigate('/admin', { state: { refresh: true } });
      })
      .catch(error => {
        console.error("There was an error updating the user!", error);
      });
  };

  const goBack = () => {
    navigate('/admin', { state: { refresh: true } });
  }

  return (
    <div style={{ maxWidth: '50%', margin: '0 auto', padding: '20px' }}>
            <div className="my-6">
            <h3 className="d-flex align-items-center">
              <UserCog className="text-naita me-2"/>
              Edit user
              </h3>
                <p className="text-secondary mt-1">Update user information and permissions</p>
                </div>
            <form onSubmit={handleSubmit}>
            
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                <CircleUser className="text-naita align-bottom me-1 mb-1" size={16}/>
                Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                <MapPinHouse className="text-naita align-bottom me-1 mb-1" size={16}/>
                Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  />
              </div>

              <div className="mb-3">
                <label htmlFor="nic" className="form-label">
                <IdCard className="text-naita align-bottom me-1 mb-1" size={16}/>
                N.I.C.</label>
                <input
                  type="text"
                  className="form-control"
                  id="nic"
                  value={nic}
                  onChange={(e) => setNIC(e.target.value)}
                  required
                  />
              </div>

              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                <CalendarFold className="text-naita align-bottom me-1 mb-1" size={16}/>
                Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  />
              </div>

              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                <Phone className="text-naita align-bottom me-1 mb-1" size={16}/>
                Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  />
              </div>

              <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <Mail className="text-naita align-bottom me-1 mb-1" size={16}/>
                Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <Lock className="text-naita align-bottom me-1 mb-1" size={16}/>
                  Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                <User className="text-naita align-bottom me-1 mb-1" size={16}/>
                Role</label>
                <select 
                  className="form-select"
                  id="role"
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {(role === 'lecturer' || role === 'student') && (
                <div className="mb-4">
                  <label htmlFor="course" className="form-label">
                  <Book className="text-naita align-bottom me-1 mb-1" size={16}/>
                  Course</label>
                  <select 
                    className="form-select"
                    id="course"
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
            <div className="d-flex" style={{ gap: '10px' }}>
              <button  
                type="cancel" 
                onClick={goBack}
                className="btn btn-secondary w-50">
                  Cancel
              </button>
              <button type="submit"
                className="btn btn-primary w-50">
                  Save Changes
              </button>
            </div>
            </form>
            <div className="alert alert-info my-4">
              <h6 className="alert-heading">Important Notes</h6>
              <hr></hr>
              <ul className="mb-0">
                <li>Changing the user's role will affect their permissions</li>
                <li>Course selection is required for students and lecturers</li>
                <li>Password updates will require the user to log in again</li>
              </ul>
            </div>
          </div>
  );
};

export default EditUser;