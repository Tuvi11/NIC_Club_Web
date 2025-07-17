import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageSocials = () => {
  const [formData, setFormData] = useState({ name: '', url: '' });
  const [socials, setSocials] = useState([]);

  const fetchSocials = async () => {
    try {
      const res = await axios.get('/api/socials');
      setSocials(res.data);
    } catch (error) {
      console.error('Error fetching socials:', error);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    await axios.post('http://localhost:5000/api/socials', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFormData({ name: '', url: '' });
    fetchSocials();
  } catch (error) {
    console.error('Error adding social:', error);
  }
};

 const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:5000/api/socials/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchSocials();
  } catch (error) {
    console.error('Error deleting social:', error);
  }
};
  return (
    <div className="container my-5">
      <h3 className="text-center fw-bold mb-4">Manage Social Links</h3>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Social Name (e.g., LinkedIn)"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="url"
            className="form-control"
            name="url"
            placeholder="https://example.com"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>

      <ul className="list-group">
        {socials.map((social) => (
          <li key={social._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{social.name}</strong> – <a href={social.url} target="_blank" rel="noreferrer">{social.url}</a>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(social._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSocials;
