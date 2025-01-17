import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

    navigate('/login');
  };

  return (
    <header style={headerStyle}>
      <img src="http://localhost:3000/logo.png" alt="Logo" style={logoStyle} />
      <h1 style={{ margin: 0 }}>
          <span style={{ color: 'white' }}>NAITA </span>
          <span style={{ opacity: 0.6 }}>Learning Management System</span></h1>
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout
          <LogOut className="ms-2" size={16}/>
          </button>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '20px 15%',
  backgroundColor: '#87212e',
  color: '#fff',
};

const logoStyle = {
  width: '50px',
  height: 'auto',
  border: '2px solid white',
  borderRadius: '50px',
  margin: '0px 1rem',
};

const logoutButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginLeft: 'auto',
};

export default Header;
