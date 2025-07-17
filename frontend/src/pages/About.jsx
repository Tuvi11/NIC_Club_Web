import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './About.css';
import { FaLaptopCode, FaPaintBrush, FaPenNib, FaCamera, FaGamepad } from 'react-icons/fa';

const teams = [
  { name: 'Tech Team', slug: 'tech', icon: <FaLaptopCode size={40} /> },
  { name: 'Design Team', slug: 'design', icon: <FaPaintBrush size={40} /> },
  { name: 'Content Team', slug: 'content', icon: <FaPenNib size={40} /> },
  { name: 'Media Team', slug: 'media', icon: <FaCamera size={40} /> },
  { name: 'E-Sports Team', slug: 'esports', icon: <FaGamepad size={40} /> },
];

const About = () => {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState([]); // ✅ Fix: Declare the missing state

  const handleClick = (slug) => {
    navigate(`/team/${slug}`);
  };

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await axios.get("/api/leaders");
        
        setLeaders(res.data);
      } catch (error) {
        console.error("Error fetching leaders:", error);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Meet Our Teams</h2>

      {/* President & Vice President Cards */}
      <div className="row justify-content-center mb-5"
      >
        {leaders.map((leader) => (
          <div className="col-10 col-sm-6 col-md-3 mb-4 text-center" key={leader.role}>
            <div className="card p-3 shadow leader" 
             style={{
                background: 'linear-gradient(135deg, #ff8c00, #ff6f00)',
                color: '#fff',
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                   <img
                    src={`http://localhost:5000/uploads/${leader.photo}`}
                     className="img-fluid rounded-circle mb-2"
                     alt={leader.name}
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />

              

              <h6 className="fw-bold">{leader.role}</h6>
              <p>{leader.name}</p>
            </div>
          </div>
        ))}
      </div>
       
      {/* Team Cards */}
      <div className="row justify-content-center">
        {teams.map((team) => (
          <div
            key={team.slug}
            className="col-md-4 col-lg-3 mb-4"
            onClick={() => handleClick(team.slug)}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="team-card text-center shadow-sm p-4 rounded-4"
              style={{
                background: 'linear-gradient(135deg, #ff8c00, #ff6f00)',
                color: '#fff',
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff33',
                  padding: '12px',
                  borderRadius: '50%',
                  marginBottom: '10px',
                }}
              >
                {team.icon}
              </div>
              <h5 className="fw-bold">{team.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
