import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import ProjectCard from '../components/projects/ProjectCard';
import projects from '../data/projects';

const ProjectsPage = () => {
  // Separate work and personal projects
  const workProjects = projects.filter(project => project.type === 'work');
  const personalProjects = projects.filter(project => project.type === 'personal');
  
  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <div className="slide-in-left">
          <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
          <p className="text-gray-300 text-lg mb-12 max-w-3xl">
            A collection of AI and automation solutions I've developed throughout my career.
          </p>
        </div>
        
        <div className="mb-16">
          <SectionTitle>Professional Projects</SectionTitle>
          <div className="grid grid-cols-3">
            {workProjects.map((project, index) => (
              <div key={project.id} className={`slide-in-up delay-${index * 100}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <SectionTitle>Personal Projects</SectionTitle>
          <div className="grid grid-cols-3">
            {personalProjects.map((project, index) => (
              <div key={project.id} className={`slide-in-up delay-${index * 100}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;