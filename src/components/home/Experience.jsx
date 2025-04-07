import React from 'react';
import SectionTitle from '../shared/SectionTitle';

const Experience = () => {
  return (
    <section id="experience" className="section section-dark">
      <div className="container">
        <SectionTitle>Professional Experience</SectionTitle>
        
        <div className="card p-8">
          <div className="flex flex-col md-flex-row justify-between mb-4">
            <div className="slide-in-left">
              <h3 className="text-2xl font-bold text-white">Software Engineer 1</h3>
              <p className="text-primary-light">Tessolve Semiconductors Pvt Ltd</p>
            </div>
            
            <div className="slide-in-right text-gray-400 mt-2 md-mt-0">
              Feb 2024 – Present
            </div>
          </div>
          
          <p className="slide-in-up delay-200 text-gray-300 mb-6">
            Leading AI and GenAI initiatives to improve business efficiency and automation across multiple departments.
          </p>
          
          <div className="slide-in-up delay-300">
            <h4 className="text-xl font-semibold text-white mb-3">Key Achievements:</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-primary-light mr-2">•</span>
                Implemented AI solutions that improved efficiency by 40-85% across business units
              </li>
              <li className="flex items-start">
                <span className="text-primary-light mr-2">•</span>
                Led implementation of Software Development Lifecycle (SDL) and CI/CD processes
              </li>
              <li className="flex items-start">
                <span className="text-primary-light mr-2">•</span>
                Established comprehensive Azure cloud architecture for AI applications
              </li>
              <li className="flex items-start">
                <span className="text-primary-light mr-2">•</span>
                Received "Exceeds Expectations" performance rating for delivering a comprehensive GenAI ecosystem
              </li>
              <li className="flex items-start">
                <span className="text-primary-light mr-2">•</span>
                Developed RAG-based Chatbot that enhanced cross-departmental information retrieval by 85%
              </li>
              <li className="flex items-start">
                <span className="text-primary-light mr-2">•</span>
                Engineered ArchShift Code Converter achieving 95% code accuracy and reducing migration time by 90%
              </li>
            </ul>
          </div>
          
          <div className="slide-in-up delay-400 mt-8">
            <a href="#projects" className="btn">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;