import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Navlogo.png';
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef(null);
    const highlightRef = useRef(null);
    const location = useLocation();

    const moveHighlight = (e) => {
        const link = e.target;
        const nav = navRef.current;
        const highlight = highlightRef.current;

        if (link && highlight && nav) {
            const linkRect = link.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            const left = linkRect.left - navRect.left;
            const width = linkRect.width;

            highlight.style.left = `${left}px`;
            highlight.style.width = `${width}px`;
        }
    };

    const resetHighlight = () => {
        const highlight = highlightRef.current;
        if (highlight) {
            highlight.style.width = `0`;
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <img src={logo} alt="NIC Logo" style={{ height: '40px', marginRight: '8px' }} />
                    NIC
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                    aria-controls="navMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navMenu">
  <div
    className="navitems d-flex flex-wrap align-items-center"
    ref={navRef}
    onMouseLeave={resetHighlight}
  >
    {["/", "/about", "/membership", "/events", "/contact", "/admin"].map((path, idx) => (
      <Link
        key={idx}
        className={`nav-link px-3${location.pathname === path ? " active" : ""}`}
        to={path}
        onMouseEnter={moveHighlight}
      >
        {path === "/" ? "Home" :
         path === "/about" ? "About" :
         path === "/membership" ? "Membership" :
         path === "/events" ? "Events" :
         path === "/contact" ? "Contact" : "Admin Login"}
      </Link>
    ))}
    <span className="innernav" ref={highlightRef}></span>
  </div>
</div>

            </div>
        </nav>
    );
};

export default Navbar;
