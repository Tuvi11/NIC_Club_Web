import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Contact = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await axios.get('/api/socials');
        setSocials(res.data);
      } catch (error) {
        console.error('Error fetching socials:', error);
      }
    };

    fetchSocials();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-5">🌐 Connect With Us</h2>

      <div className="row justify-content-center">
        {socials.map((social) => (
          <div key={social._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div
              className="card text-center border-0 h-100 p-4 contact-card"
              style={{
                background: 'linear-gradient(135deg, #ff8c00, #ff6c00)',
                color: '#fff',
                borderRadius: '16px',
                transition: 'transform 0.2s ease, box-shadow 0.3s ease',
              }}
            >
              <h5 className="mb-3">{social.name}</h5>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light text-orange fw-bold d-flex align-items-center justify-content-center gap-2"
              >
                Visit <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
