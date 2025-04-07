import React, { useState } from 'react';
import SectionTitle from '../shared/SectionTitle';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For now, we'll just simulate a form submission
    // In a real application, you would send this to a backend API
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 1000);
  };
  
  return (
    <section id="contact" className="section section-dark">
      <div className="container">
        <SectionTitle>Get In Touch</SectionTitle>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="slide-in-left">
            <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
            <p className="text-gray-300 mb-6">
              I'm always open to discussing new projects, opportunities, or partnerships.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start">
                <div className="text-primary-light mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">Email</h4>
                  <a href="mailto:amanharisofficial@protonmail.com" className="text-gray-400 hover:text-primary-light">
                    amanharisofficial@protonmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary-light mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">Phone</h4>
                  <a href="tel:+918618985209" className="text-gray-400 hover:text-primary-light">
                    +91-8618985209
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary-light mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0a10 10 0 1010 10A10.009 10.009 0 0010 0zm6.613 4.614a8.523 8.523 0 011.93 5.32 20.094 20.094 0 00-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 00-.566-1.239 11.41 11.41 0 004.769-3.366zM8 1.707a8.821 8.821 0 012-.238 8.5 8.5 0 015.664 2.152 9.608 9.608 0 00-4.476 3.087A45.758 45.758 0 008 1.707zM1.642 8.262a8.57 8.57 0 014.73-5.981A53.998 53.998 0 018.53 7.256a14.299 14.299 0 00-6.888 1.006zm2.87 7.825a8.4 8.4 0 01-2.88-4.079 12.88 12.88 0 016.608-1.108c.574 1.096 1.206 2.1 1.872 3.034-1.95 1.941-4.015 3.67-5.6 4.153zm9.063-1.11a27.6 27.6 0 00-1.6-2.869c1.966-.08 3.915.12 5.809.618a8.52 8.52 0 01-4.209 2.251z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/aman-haris" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-primary-light"
                  >
                    linkedin.com/in/aman-haris
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary-light mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">Location</h4>
                  <p className="text-gray-400">
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="slide-in-right">
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              {formStatus.submitted && formStatus.success ? (
                <div className="bg-green-900/30 border border-green-700 text-green-300 rounded-lg p-4 mb-6">
                  {formStatus.message}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-dark/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-dark/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-dark-dark/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;