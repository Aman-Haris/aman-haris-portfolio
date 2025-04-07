import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import ImagePlaceholder from '../ui/ImagePlaceholder';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid grid-cols-2">
          <div className="slide-in-left order-2 md-order-1">
            <p className="text-lg text-gray-300 mb-6">
              Software Engineer with expertise in AI, GenAI, ML and Automation. I specialize in developing impactful solutions that enhance business efficiency through advanced AI technologies.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Based in Bengaluru, Karnataka, I'm passionate about leveraging cutting-edge technology to solve complex problems and drive innovation.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Education</h3>
              <div className="flex flex-col gap-4">
                <div className="card p-4">
                  <h4 className="text-lg font-semibold text-primary-light">MSc Artificial Intelligence</h4>
                  <p className="text-gray-400">Heriot-Watt University Edinburgh | Sept 2022 – Dec 2023</p>
                </div>
                <div className="card p-4">
                  <h4 className="text-lg font-semibold text-primary-light">BE in Computer Science</h4>
                  <p className="text-gray-400">AMC Engineering College Bengaluru | Aug 2018 – Aug 2022</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#experience" className="btn-secondary">
                View Experience
              </a>
              <a href="#skills" className="btn-secondary">
                My Skills
              </a>
            </div>
          </div>

          <div className="slide-in-right order-1 md-order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-xl transform -rotate-6"></div>
              <div className="relative card overflow-hidden h-96 rounded-2xl">
                <ImagePlaceholder text="Profile Photo" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-primary rounded-full opacity-60 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;