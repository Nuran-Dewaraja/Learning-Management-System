import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { UserPlus, User, Mail, Lock, Book, CircleUser, MapPinHouse, IdCard, CalendarFold, Phone } from 'lucide-react';

const UserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("0"); 
  const [userId, setUserId] = useState(""); 
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const serviceId = "service_ep0eufr";
  const tempId = "template_m5hhtfn";
  const publicKey = "TT5yrs8SNBATYvrqV";

  const courses = [
    "ICT",
    "Software Engineering",
    "Hotel Sector",
    "Automobile Mechanic",
    "Electrical Technician",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      role,
      address,
      name,
      nic,
      contact,
      dob,
      course: role === "lecturer" || role === "student" ? course : "0", 
    };

    try {
      const response = await axios.post(
        "http://localhost:1212/api/users",
        newUser
      );
      setUserId(response.data); 
      setMessage(`User created successfully with ID: ${response.data}`);

      if (email.endsWith("@gmail.com")) {
        sendEmail();
      } else {
        navigate("/admin", { state: { refresh: true } });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      setMessage("Error saving user");
    }
  };

  const sendEmail = () => {
    const tempateParams = {
      user_email: email,
      user_password: password,
      reply_to: email,
    };

    emailjs
      .send(serviceId, tempId, tempateParams, publicKey)
      .then((response) => {
        console.log("Email Sent Successfuly !!", response);
        setEmail("");
        setPassword("");
        navigate("/admin", { state: { refresh: true } });
      })
      .catch((error) => {
        console.log("Error sending email", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const goBack = () => {
    navigate('/admin', { state: { refresh: true } });
  }

  return (
    <div style={{ maxWidth: '50%', margin: '0 auto', padding: '20px' }}>
      <div className="my-6">
        <h3 className="d-flex align-items-center">
          <UserPlus className="text-naita me-2"/>
          Add New User
          </h3>
          <p className="text-secondary mt-1">Add new user information and permissions</p>
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
                  <option value="">Select Role</option>
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
                  Save User
              </button>
            </div>
            </form>
  
            {userId && <p className="text-muted">User ID: {userId}</p>}
            {message && <p className="text-info">{message}</p>}
  
            {/* <button 
              onClick={handleLogout} 
              className="btn btn-outline-secondary"
              style={{ width: '300px' }}
            >
              Logout
            </button> */}
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

export default UserForm;
