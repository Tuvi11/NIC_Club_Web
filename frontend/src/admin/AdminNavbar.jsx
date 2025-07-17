import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Navlogo.png';
import { useNavigate } from 'react-router-dom';


  

 const AdminNavbar = () => {

  const navigate = useNavigate();
    const handleLogout = ()=>{
       localStorage.removeItem("token");
        navigate('/')
    } 

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/admin/dashboard">
          <img
            src={logo}
            alt="Admin Logo"
            style={{ height: '40px', marginRight: '8px' }}
          />
          
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNav"
          aria-controls="adminNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            <Link to="/admin/leaders" className="btn btn-outline-primary">
  Manage Leaders
</Link>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/members">Manage Members</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/events">Manage Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/recruitments">Manage Recruitments</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/socials">Manage Socials</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-sm btn-danger ms-2" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
