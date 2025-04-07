import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import skills from '../../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle>Technical Expertise</SectionTitle>
        
        <div className="grid grid-cols-3">
          {skills.map((category, index) => (
            <div
              key={category.title}
              className={`slide-in-up delay-${index * 100} card p-6`}
            >
              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
              <div className="flex flex-wrap">
                {category.items.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;