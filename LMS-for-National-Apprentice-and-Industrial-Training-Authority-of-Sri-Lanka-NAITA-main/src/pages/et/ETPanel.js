import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ETPanel = () => {
  const [etContent, setETContent] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchETContent = async () => {
    try {
      const response = await axios.get('http://localhost:1212/courses/get-electrical');
      setETContent(response.data);
    } catch (error) {
      console.error('Error fetching ET content:', error);
    }
  };


  useEffect(() => {
    fetchETContent();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      const timer = setTimeout(() => {
        fetchETContent();
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [location.state?.refresh]);


  const handlePdfDownload = (pdfString, fileName) => {
    const byteCharacters = atob(pdfString.split(',')[1]); 
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = fileName || 'download.pdf';
    link.click();

    URL.revokeObjectURL(url); 
  };

  const formatTimestamp = (timestamp) => {
    const timestampInMs = parseInt(timestamp) * 1000; 
    return new Date(timestampInMs).toLocaleString();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this ET content?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:1212/courses/delete-electrical/${id}`);
        window.location.reload();

      } catch (error) {
        console.error('Error deleting ET entry:', error);
      }
    }
  };

const handleEdit = (et) => {
  navigate('/edit-et', { state: { et } });
};

  return (
    <div style={{ maxWidth: '65%', margin: '0 auto', padding: '15px' }}>
      <div className="d-flex justify-content-between align-items-center m-3">
      <div><h3>Manage Electrical Technician Course Resources</h3>
      <p className="text-secondary">Add, edit, or delete lecture materials, quizzes, assessments, and other course content.</p> </div>
      <button className="btn btn-success mx-3" onClick={() => navigate('/et-lecturer')}>Add New Electrical Content</button>
      </div>
      <div style={{display: 'flex',flexWrap: 'wrap',justifyContent: 'flex-start'}}>
        {etContent.map((item) => (
          <div className="shadow card text-dark bg-light" key={item.id} style={{margin: '8px', width: '300px' }}>
            <h3 className="card-header">{item.title}</h3>
            <div className="card-body">
              <p className="card-title">{item.description}</p>
              <p className="card-text">{formatTimestamp(item.timestamp)}</p>
            </div>
            <div className="card-footer bg-transparent" style={{display: 'flex',justifyContent: 'space-between'}}>
            <a className="btn btn-success"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePdfDownload(item.pdfString, `${item.title}.pdf`);
              }}>
              Download PDF
            </a>

            <button onClick={() => handleDelete(item.id)}
            className="btn btn-danger">
              Delete
            </button>

            <button
                onClick={() => handleEdit(item)}
                className="btn btn-info">
                Edit
              </button>
              </div>
              </div>
        ))}
      </div>
    </div>
  );
};

export default ETPanel;
