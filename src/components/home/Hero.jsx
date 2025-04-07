// components/home/Hero.jsx
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const fullText = "AI ML GenAI Automation Solutions Engineer";
  
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayText, fullText]);

  return (
    <section className="section min-h-screen flex flex-col justify-center" id="home">
      {/* Particle/Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Add subtle diagonal lines similar to the reference image */}
          <div className="diagonal-lines"></div>
          
          {/* Gradient spots */}
          <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-96 h-96 rounded-full bg-secondary/20 blur-3xl top-1/3 right-10"></div>
          <div className="absolute w-96 h-96 rounded-full bg-accent/20 blur-3xl bottom-10 left-1/4"></div>
        </div>
      </div>

      {/* Hero Content - Centered */}
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Small introduction text */}
          <div className="slide-in-left mb-6">
            <p className="text-lg text-gray-300">
              Hello, I'm Aman. A passionate Software Engineer.
            </p>
          </div>

          {/* Main title with typing effect */}
          <div className="slide-in-left delay-200">
            <h1 className="text-6xl font-bold text-white mb-10">
              {displayText}
              <span className={`text-primary-light ${isTypingComplete ? 'typing-cursor' : ''}`}>|</span>
            </h1>
          </div>

          {/* Buttons */}
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