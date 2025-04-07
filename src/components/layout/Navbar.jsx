import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="slide-in-left">Aman Haris</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-links">
            {['About', 'Experience', 'Projects', 'Contact'].map((item, index) => (
              <div key={item} className={`slide-in-left delay-${(index + 1) * 100}`}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="navbar-link"
                >
                  {item}
                </a>
              </div>
            ))}
            <div className="slide-in-left delay-500">
              <a
                href="/Aman_Haris_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-link text-primary-light"
              >
                Resume
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                  fill="currentColor"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                  fill="currentColor"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mobile-menu active">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="navbar-link"
              >
                {item}
              </a>
            ))}
            <a
              href="/Aman_Haris_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-link text-primary-light"
            >
              Resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;