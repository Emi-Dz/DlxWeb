
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { BENEFITS } from '../constants';

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

const BenefitItem: React.FC<{ benefit: typeof BENEFITS[0], index: number }> = ({ benefit, index }) => {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

    return (
        <div
            ref={ref}
            className={`text-center p-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-card-bg/60 hover:scale-105 ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="flex justify-center mb-4 text-accent-purple">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-light-text mb-2">{benefit.title}</h3>
            <p className="text-light-text/80">{benefit.description}</p>
        </div>
    );
};


const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="bg-dark-blue py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>¿Por qué elegir DlxTech?</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {BENEFITS.map((benefit, index) => (
            <BenefitItem key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;