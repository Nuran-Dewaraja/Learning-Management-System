import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FilePen, Newspaper, FileText, Text, FileClock   } from 'lucide-react';

const EditHotelForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel } = location.state;

  const [title, setTitle] = useState(hotel.title);
  const [pdfString, setPdfString] = useState(hotel.pdfString);
  const [description, setDescription] = useState(hotel.description);
  const [timestamp] = useState(hotel.timestamp); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedHotel = {
      title,
      pdfString,
      description,
      timestamp, 
    };

    try {
      await axios.put(`http://localhost:1212/courses/edit-hotel/${hotel.id}`, updatedHotel);
      navigate('/hotel-list', { state: { refresh: true } }); 
    } catch (error) {
      console.error('Error updating Hotel content:', error);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfString(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const goBack = () => {
    navigate('/hotel-list', { state: { refresh: true } });
  }

  return (
    <div style={{ maxWidth: '50%', margin: '0 auto', padding: '20px' }}>
      <div className="my-6">
        <h3 className="d-flex align-items-center">
          <FilePen className="text-naita me-2"/>
            Edit Hotel Content
        </h3>
        <p className="text-secondary mt-1">Edit Hotel lecture materials and content</p>
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
        PDF:</label>
          <input
            class="form-control" 
            type="file"
            accept=".pdf"
            onChange={handlePdfChange}
          />
          <p>Current PDF: {pdfString && 'PDF selected'}</p>
        </div>
        <div className="mb-3">
          <label className="form-label">
          <Text className="text-naita align-bottom me-1 mb-1" size={16}/>
          Description:</label>
          <textarea className="form-control" rows="3" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
          <FileClock className="text-naita align-bottom me-1 mb-1" size={16}/>
          Timestamp:</label>
          <input
            type="text"
            className="form-control"
            value={timestamp}
            readOnly
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
                Save Changes
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
    </div>
  );
};

export default EditHotelForm;
