import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import Skills from '../components/home/Skills';
import Projects from '../components/home/Projects';
import PersonalProjects from '../components/home/PersonalProjects';
import Contact from '../components/home/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <PersonalProjects />
      <Contact />
    </>
  );
};

export default HomePage;