
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { SERVICES } from '../constants';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`bg-card-bg p-8 rounded-xl shadow-2xl border border-white/5 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-accent-purple/30 transition-all duration-300 ease-in-out text-center ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-center mb-5 text-accent-purple">{service.icon}</div>
      <h3 className="text-2xl font-bold text-light-text mb-3">{service.title}</h3>
      <p className="text-light-text/80 leading-relaxed">{service.description}</p>
    </div>
  );
};

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

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Nuestros Servicios de Vanguardia</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
