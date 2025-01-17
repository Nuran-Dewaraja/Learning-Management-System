import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookUser, Trash2, UserPen } from 'lucide-react';
import DataTable from 'react-data-table-component';

const StudentPanel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:1212/api/get-users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (location.state?.refresh) {
      fetchUsers();
    }
  }, [location.state?.refresh]);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:1212/api/delete-user/${id}`)
      .then(response => {
        alert(response.data);
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const editUser = (user) => {
    navigate(`/edit-user`, { state: { user } });
  };

  const handleAddUserClick = () => {
    navigate('/add-user');
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      fixed: 'left',
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Course',
      selector: row => row.course,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Date of Birth',
      selector: row => row.dob,
      sortable: true,
    },
        
    {
      name: 'Contact No',
      selector: row => row.contact,
      sortable: true,
    },
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex justify-content-between gap-2">
          <button className="btn btn-outline-info btn-sm" data-toggle="tooltip" data-placement="top" title="Edit User" onClick={() => editUser(row)}>
          <UserPen className="text-outline-info" size={17}/>
          </button>
          <button className="btn btn-outline-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete User" onClick={() => deleteUser(row.id)}>
          <Trash2 className="text-outline-danger" size={17}/>

          </button>
        </div>
      ),
      width: '100px',
    },
  ];

  const customStyles = {
    table: {
      style: {
        minHeight: '300px',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#d5d8dc',
        borderTop: '1px solid #dee2e6',
      },
    },
    rows: {
      stripedStyle: {
        backgroundColor: '#f4f6f6',
      },
    },
    
  };

  return (
    <div style={{ padding: '0 11rem' }}>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
        <h2 className="d-flex align-items-center">
          <BookUser className="text-naita mt-1 me-2"/>
          User List
        </h2>
        <button className="btn btn-success" onClick={handleAddUserClick}>Add New User</button>
      </div>
      <DataTable
        columns={columns}
        data={users}
        customStyles={customStyles}
        striped
        fixedHeader
        fixedHeaderScrollHeight="550px"
        responsive
      />
    </div>
  );
};

export default StudentPanel;