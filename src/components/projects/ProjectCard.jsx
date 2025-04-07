import React from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import SkillTag from '../ui/SkillTag';

const ProjectCard = ({ project }) => {
  const { id, title, shortDescription, technologies, stats, type, imageUrl, githubUrl } = project;

  return (
    <div className="card hover-lift">
      <div className="card-image">
        <ImagePlaceholder text={title} />
      </div>
      
      <div className="card-content flex flex-col">
        <h3 className="card-title">{title}</h3>
        <p className="card-description flex-grow">{shortDescription}</p>
        
        {stats && stats.length > 0 && (
          <div className="mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-lg font-bold text-primary-light mr-2">{stat.value}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap mb-4">
          {technologies.slice(0, 4).map((tech, index) => (
            <SkillTag key={index} name={tech} />
          ))}
          {technologies.length > 4 && (
            <span className="text-xs text-gray-400 self-center ml-2">+{technologies.length - 4} more</span>
          )}
        </div>
        
        <div className="mt-auto">
          {type === 'work' ? (
            <Link to={`/projects/${id}`} className="btn-secondary w-full text-center">
              View Details
            </Link>
          ) : (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-center">
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;