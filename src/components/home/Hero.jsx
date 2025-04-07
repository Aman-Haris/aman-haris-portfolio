import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedEl = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
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
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="section min-h-screen flex items-center" id="home">
      {/* Particle/Neural Network Background (placeholder for now) */}
      <div className="absolute inset-0 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* We'll add a proper particle animation later */}
          <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-96 h-96 rounded-full bg-secondary/20 blur-3xl top-1/3 right-10"></div>
          <div className="absolute w-96 h-96 rounded-full bg-accent/20 blur-3xl bottom-10 left-1/4"></div>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <div className="slide-in-left">
            <h1 className="text-5xl font-bold text-white mb-4">
              Hi, I'm <span className="text-primary-light">Aman Haris</span>
            </h1>
          </div>

          <div className="slide-in-left delay-200">
            <h2 className="text-3xl font-bold text-gray-300 mb-6">
              <span ref={typedEl}></span>
            </h2>
          </div>

          <div className="slide-in-left delay-300">
            <p className="text-xl text-gray-300 mb-8">
              Transforming business challenges into efficient AI-powered solutions
            </p>
          </div>

          <div className="slide-in-left delay-400 flex gap-4">
            <a href="#projects" className="btn">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;