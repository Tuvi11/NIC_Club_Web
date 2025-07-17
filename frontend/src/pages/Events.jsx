import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const formatUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <div className="container my-5">
      <h3 className="text-center fw-bold mb-4">Our Events</h3>
      <div className="row justify-content-center">
        {events.length === 0 && (
          <p className="text-center">No events available right now.</p>
        )}
        {events.map((event) => (
          <div key={event._id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card h-100 shadow-sm p-3 text-white"
              style={{
                background: 'linear-gradient(135deg, #ff8c00, #ff6c00)',
                border: 'none',
                borderRadius: '15px'
              }}
            >
              <h5 className="card-title fw-bold">{event.name}</h5>
              <p className="card-text">{event.description}</p>
              <p className="mb-1"><strong>Date:</strong> {event.date}</p>
              <p className="mb-1"><strong>Time:</strong> {event.time}</p>
              <p className="mb-1"><strong>Location:</strong> {event.location}</p>
              {event.requirements && (
                <p className="mb-1"><strong>Requirements:</strong> {event.requirements}</p>
              )}

              <a
                href={formatUrl(event.registrationLink)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light mt-2 fw-semibold"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
