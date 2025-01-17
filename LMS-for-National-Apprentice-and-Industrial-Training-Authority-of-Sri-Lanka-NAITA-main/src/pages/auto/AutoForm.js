import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FilePlus2 , Newspaper, FileText, Text   } from 'lucide-react';

const AutoForm = () => {
  const [title, setTitle] = useState('');
  const [pdfString, setPdfString] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(''); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPdfString(reader.result);
    };
    reader.onerror = (error) => {
      console.error('Error converting file to Base64:', error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestampInSeconds = Math.floor(Date.now() / 1000);

    const newAutoEntry = {
      title,
      pdfString,
      description,
      timestamp: timestampInSeconds
    };

    try {
      const response = await axios.post('http://localhost:1212/courses/automobile', newAutoEntry);
      setId(response.data)
      setMessage(`Automobile entry created successfully with ID: ${response.data}`);
      navigate('/auto-list', { state: { refresh: true } });
    } catch (error) {
      console.error("Error saving Automobile entry:", error);
      setMessage('Error saving Automobile entry');
    }
  };

  const goBack = () => {
    navigate('/auto-list', { state: { refresh: true } });
  }

  return (
    <div style={{ maxWidth: '50%', margin: '0 auto', padding: '20px' }}>
      <div className="my-6">
        <h3 className="d-flex align-items-center">
          <FilePlus2  className="text-naita me-2"/>
          Create Automobile Content
          </h3>
          <p className="text-secondary mt-1">Create new Automobile lecture materials and content</p>
          </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>
          <Newspaper className="text-naita align-bottom me-1 mb-1" size={16}/>
            Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
        <label className="form-label">
        <FileText className="text-naita align-bottom me-1 mb-1" size={16}/>
        PDF File:</label>
          <input 
            class="form-control" 
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-3">
        <label className="form-label">
        <Text className="text-naita align-bottom me-1 mb-1" size={16}/>
        Description:</label>
        <textarea class="form-control" rows="3" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="d-flex" style={{ gap: '10px' }}>
          <button  
            type="cancel" 
            onClick={goBack}
            className="btn btn-secondary w-50">
              Cancel
            </button>
            <button type="submit"
              className="btn btn-primary w-50">
                Save Entry
          </button>
        </div>
      </form>
      <div className="alert alert-info my-4">
        <h6 className="alert-heading">Important Notes</h6>
        <hr></hr>
        <ul className="mb-0">
          <li>File size must be under 1MB for each upload.</li>
          <li>Accepted file formats is PDF.</li>
          <li>Ensure all content is accurate and up-to-date before uploading.</li>
          <li>Uploaded materials will be accessible to enrolled students only.</li>
        </ul>
        </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AutoForm;
