import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import ProjectCard from '../projects/ProjectCard';
import projects from '../../data/projects';

const PersonalProjects = () => {
  // Filter personal projects
  const personalProjects = projects.filter(project => project.type === 'personal');
  
  return (
    <section id="personal-projects" className="section">
      <div className="container">
        <SectionTitle>Personal Projects</SectionTitle>
        
        <div className="grid grid-cols-3">
          {personalProjects.map((project, index) => (
            <div key={project.id} className={`slide-in-up delay-${index * 100}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;