// components/home/About.jsx
import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import ImagePlaceholder from '../ui/ImagePlaceholder';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid grid-cols-2 gap-12">
          <div className="slide-in-left">
            <div className="mb-8">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Software Engineer with expertise in AI, GenAI, ML and Automation. 
                I specialize in developing impactful solutions that enhance 
                business efficiency through advanced AI technologies.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Based in Bengaluru, Karnataka, I'm passionate about leveraging 
                cutting-edge technology to solve complex problems and drive innovation.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 education-heading">
                Education
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="education-card p-6">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary-light">MSc Artificial Intelligence</h4>
                      <p className="text-gray-400">Heriot-Watt University Edinburgh | Sept 2022 – Dec 2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="education-card p-6">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary-light">BE in Computer Science</h4>
                      <p className="text-gray-400">AMC Engineering College Bengaluru | Aug 2018 – Aug 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-xl transform -rotate-6"></div>
              <div className="relative card overflow-hidden rounded-2xl">
                {/* Simple profile photo without floating tech icons */}
                <div className="profile-photo-container">
                  <ImagePlaceholder text="Profile Photo" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-primary rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-accent rounded-full opacity-40 blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;