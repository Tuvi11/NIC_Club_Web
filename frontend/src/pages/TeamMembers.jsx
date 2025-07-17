import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeamMembers = () => {
  const { slug } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`/api/members?team=${slug}`, {withCredentials: true});
      setMembers(res.data);
      console.log("Fetched Members:", res.data); 
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  fetchMembers();
}, [slug]);


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">{slug.toUpperCase()} Team</h2>
       <div className="row justify-content-center">
  {members.map((member) => (
    <div key={member._id} className="col-md-4 col-lg-3 mb-4">
      <div
        className="card shadow p-3 text-center d-flex flex-column justify-content-between text-white"
        style={{
          height: '100%',
          minHeight: '370px',
          background: 'linear-gradient(135deg, #ff8C00, #ff6f00)', // gradient
          border: 'none',
          borderRadius: '15px',
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${member.photo}`}
          alt={member.name}
          className="img-fluid rounded-circle mb-3 mx-auto"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            border: '3px solid white',
          }}
        />
        <div>
          <h5 className="fw-bold">{member.name}</h5>
          <p>{member.year}, {member.branch}</p>
        </div>
        <div>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-sm m-1"
            >
              LinkedIn
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-sm m-1"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default TeamMembers;
