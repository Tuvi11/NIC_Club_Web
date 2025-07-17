import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Manageevents = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    time: '',
    date: '',
    location: '',
    registrationLink: '',
    requirements: '',
    whatsappLink: '',
  });

  const [events, setEvents] = useState([]);

  const formatUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/events', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        name: '',
        description: '',
        time: '',
        date: '',
        location: '',
        registrationLink: '',
        requirements: '',
        whatsappLink: '',
      });
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center fw-bold mb-4">Manage Events</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="row g-3">
          {['name', 'description', 'time', 'date', 'location', 'registrationLink', 'requirements', 'whatsappLink'].map((field, i) => (
            <div key={i} className="col-md-6">
              <input
                type="text"
                className="form-control"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required={field !== 'requirements'}
              />
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-3" type="submit">Add Event</button>
      </form>

      <div className="row">
        {events.map(event => (
          <div key={event._id} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm h-100">
              <h5>{event.name}</h5>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              {event.requirements && <p><strong>Requirements:</strong> {event.requirements}</p>}
              
              <a
                href={formatUrl(event.registrationLink)}
                className="btn btn-outline-primary mb-2"
                target="_blank"
                rel="noreferrer"
              >
                Register
              </a>

              {event.whatsappLink && (
                <a
                  href={formatUrl(event.whatsappLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success mt-2"
                >
                  WhatsApp Group
                </a>
              )}

              <button className="btn btn-danger mt-2" onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manageevents;
