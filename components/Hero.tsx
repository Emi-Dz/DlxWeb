import React from 'react';
import { handleLinkClick } from '../utils/navigation';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-dark-background to-dark-blue py-24 sm:py-32 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light-text leading-tight shadow-lg mb-6">
          Innovación Inteligente
          <br />
          para la Evolución de tu Negocio.
        </h1>
        <p className="text-lg sm:text-xl text-light-text/90 max-w-3xl mx-auto mb-10">
          Transformamos tu negocio con soluciones tecnológicas avanzadas y personalizadas.
        </p>
        <a
          href="#contact"
          onClick={handleLinkClick}
          className="inline-block bg-button-bg text-light-text font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-button-hover hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          Solicitar una Solución
        </a>
      </div>
    </section>
  );
};

export default Hero;
