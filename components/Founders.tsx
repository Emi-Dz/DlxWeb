

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FOUNDERS } from '../constants';
import type { Founder } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-4xl sm:text-5xl font-bold text-light-text relative inline-block">
        {children}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent-purple rounded-full"></span>
      </h2>
    </div>
  );
};

const UserIcon: React.FC<{ className?: string }> = ({ className = "w-24 h-24 text-light-text/20" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
);

const FounderCard: React.FC<{ founder: Founder; index: number }> = ({ founder, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    
    const hasImageUrl = founder.image && founder.image !== 'user-icon';

    return (
    <div
        ref={ref}
        className={`bg-card-bg p-8 rounded-xl shadow-2xl border border-white/5 flex flex-col items-center text-center transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg hover:shadow-accent-purple/30 ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 0.15}s` }}
    >
        <div className="w-40 h-40 bg-dark-blue rounded-full flex items-center justify-center mb-6 ring-4 ring-dark-blue/50 overflow-hidden">
            {hasImageUrl ? (
                <img src={founder.image} alt={`Foto de ${founder.name}`} className="w-full h-full object-cover" />
            ) : (
                <UserIcon className="w-24 h-24 text-light-text/20" />
            )}
        </div>
        <h3 className="text-2xl font-bold text-light-text">{founder.name}</h3>
        <p className="text-accent-purple font-semibold mb-4">{founder.title}</p>
        <div className="border-t border-white/10 w-1/4 my-4"></div>
        <div className="text-left w-full">
            <h4 className="text-lg font-semibold text-light-text/90 mb-2">Sobre mí</h4>
            <p className="text-light-text/80 text-sm leading-relaxed">{founder.description}</p>
        </div>
    </div>
    );
};


const Founders: React.FC = () => {
  return (
    <section id="founders" className="py-20 sm:py-28 bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Conoce a Nuestros Fundadores</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {FOUNDERS.map((founder, index) => (
            <FounderCard key={index} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;