import React from 'react';
import logo from '../assets/Navlogo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-simple">
      <div className="footer-content">
        <img src={logo} alt="NIC Logo" className="footer-logo" />
        <h4>NIC Club</h4>
        <p>© {new Date().getFullYear()} Nova Innovative Compskey. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
