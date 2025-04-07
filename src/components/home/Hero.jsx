// components/home/Hero.jsx
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedEl = useRef(null);

  useEffect(() => {
    // Make sure Typed.js is properly initialized
    const options = {
      strings: [
        'AI Engineer',
        'GenAI Specialist',
        'Automation Expert',
        'ML Engineer'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      cursorChar: '|',
      smartBackspace: true,
    };

    // Make sure the element exists before initializing Typed
    if (typedEl.current) {
      const typed = new Typed(typedEl.current, options);

      // Clean up
      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <section className="section min-h-screen flex flex-col justify-center" id="home">
      {/* Particle/Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-96 h-96 rounded-full bg-secondary/20 blur-3xl top-1/3 right-10"></div>
          <div className="absolute w-96 h-96 rounded-full bg-accent/20 blur-3xl bottom-10 left-1/4"></div>
        </div>
      </div>

      {/* Hero Content - Centered */}
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="slide-in-left">
            <h1 className="text-7xl font-bold text-white mb-6">
              Hi, I'm <span className="text-primary-light">Aman Haris</span>
            </h1>
          </div>

          <div className="slide-in-left delay-200">
            <h2 className="text-5xl font-bold text-gray-300 mb-8 min-h-[70px]">
              <span ref={typedEl}></span>
            </h2>
          </div>

          <div className="slide-in-left delay-400 hero-buttons">
            <a href="#projects" className="btn-large">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary-large">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;