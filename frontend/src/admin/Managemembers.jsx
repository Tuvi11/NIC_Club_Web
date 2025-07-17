import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Managemembers.css';

const Managemembers = () => {
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    year: '',
    branch: '',
    linkedin: '',
    github: '',
  });
  const [photo, setPhoto] = useState(null);
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('/api/members',{withCredentials: true});
      setMembers(res.data);
    } catch (error) {
      console.log('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (photo) data.append('photo', photo);

      await axios.post('/api/members', data);
      alert('Member added successfully');
      setFormData({
        name: '',
        team: '',
        year: '',
        branch: '',
        linkedin: '',
        github: '',
      });
      setPhoto(null);
      fetchMembers();
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Error adding member');
    }
  };




  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/members/${id}`);
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="text-center fw-bold mb-4">Manage Team Members</h3>
      
      <form className="row g-3 mb-5" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="col-md-6">
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        </div>
        <div className="col-md-6">
          <select className="form-select" name="team" value={formData.team} onChange={handleChange} required>
            <option value="" disabled>Select Team</option>
            <option value="tech">Tech</option>
            <option value="design">Design</option>
            <option value="content">Content</option>
            <option value="media">Media</option>
            <option value="esports">E-Sports</option>
          </select>
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" name="year" value={formData.year} onChange={handleChange} placeholder="Year (optional)" />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch (optional)" />
        </div>
        <div className="col-md-4">
          <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn (optional)" />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub (optional)" />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-5">Add Member</button>
        </div>
      </form>

      <div className="row">
        {members.map((member) => (
          <div key={member._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center p-3">
              {member.photo && (
                <img
                  src={`http://localhost:5000/uploads/${member.photo}`}
                  alt={member.name}
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              )}
              <h5 className="fw-bold">{member.name}</h5>
              <p className="text-muted">{member.team.toUpperCase()} Team</p>
              <p>{member.year} {member.branch}</p>
              <div>
                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn </a>}
                {member.github && <a href={member.github} target="_blank" rel="noreferrer">GitHub</a>}
              </div>
              <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDelete(member._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Managemembers;
