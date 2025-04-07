import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../shared/SectionTitle';
import ProjectCard from '../projects/ProjectCard';
import projects from '../../data/projects';

const Projects = () => {
  // Filter work projects
  const workProjects = projects.filter(project => project.type === 'work');
  
  return (
    <section id="projects" className="section section-dark">
      <div className="container">
        <SectionTitle>Featured Projects</SectionTitle>
        
        <p className="slide-in-up text-gray-300 text-lg mb-10 max-w-3xl">
          A selection of AI and automation solutions I've developed to solve real-world business challenges.
        </p>
        
        <div className="grid grid-cols-3">
          {workProjects.slice(0, 3).map((project, index) => (
            <div key={project.id} className={`slide-in-up delay-${index * 100}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {workProjects.length > 3 && (
          <div className="slide-in-up delay-400 mt-12 text-center">
            <Link to="/projects" className="btn">
              View All Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;