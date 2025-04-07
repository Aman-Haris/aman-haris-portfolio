import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h3 className="footer-logo">Aman Haris</h3>
            <p className="footer-description">AI Engineer & GenAI Specialist</p>
          </div>
          
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <a href="#about" className="footer-link">About</a>
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-links">
              <a 
                href="https://linkedin.com/in/aman-haris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/aman-haris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a 
                href="mailto:amanharisofficial@protonmail.com"
                className="footer-link"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Aman Haris. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;