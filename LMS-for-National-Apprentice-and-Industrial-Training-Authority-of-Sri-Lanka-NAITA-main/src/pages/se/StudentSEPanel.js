import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StudentSEPanel = () => {
  const [seContent, setSEContent] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSEContent = async () => {
    try {
      const response = await axios.get('http://localhost:1212/courses/get-software');
      setSEContent(response.data);
    } catch (error) {
      console.error('Error fetching SE content:', error);
    }
  };

  useEffect(() => {
    fetchSEContent(); 
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      const timer = setTimeout(() => {
        fetchSEContent(); 
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

  return (
    <div style={{ maxWidth: '65%', margin: '0 auto', padding: '20px' }}>
      <h3 className="mx-3">Software Engineering Course Resources</h3>
      <p className="text-secondary mx-3">Access lecture materials, quizzes, assessments, and other resources.</p>
      <div style={{display: 'flex',flexWrap: 'wrap',justifyContent: 'flex-start'}}>
        {seContent.map((item) => (
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
              }}
            >
              Download PDF
            </a>
            </div>
              </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSEPanel;
