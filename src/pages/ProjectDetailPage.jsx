import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import SkillTag from '../components/ui/SkillTag';
import projects from '../data/projects';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    const foundProject = projects.find(p => p.id === projectId);
    setProject(foundProject);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [projectId]);
  
  if (!project) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Project not found</h2>
            <Link to="/projects" className="btn mt-6">
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <Link to="/projects" className="inline-flex items-center text-gray-400 hover:text-primary-light mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
        
        <div className="slide-in-left">
          <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <SkillTag key={index} name={tech} />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="slide-in-left col-span-2">
            <div className="card overflow-hidden h-96">
              <ImagePlaceholder text={project.title} />
            </div>
          </div>
          
          <div className="slide-in-right">
            <div className="card p-6 h-full">
              <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
              
              {project.impact && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary-light mb-2">Impact</h4>
                  <p className="text-gray-300">{project.impact}</p>
                </div>
              )}
              
              {project.stats && project.stats.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary-light mb-2">Key Metrics</h4>
                  {project.stats.map((stat, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="text-xl font-bold text-white mr-2">{stat.value}</span>
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {project.type === 'personal' && project.githubUrl && (
                <div className="mt-auto pt-4">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full text-center"
                  >
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="slide-in-up card p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Project Description</h3>
          <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
        </div>
        
        <div className="slide-in-up flex justify-between items-center">
          <Link to="/projects" className="btn-secondary">
            Back to Projects
          </Link>
          
          <a href="#contact" className="btn">
            Discuss This Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;