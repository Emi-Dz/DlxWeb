import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FEATURED_PROJECT } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-4xl sm:text-5xl font-bold text-light-text relative inline-block">
        {children}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent-purple rounded-full"></span>
      </h2>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
      });

    const { youtubeVideoId, title, description } = FEATURED_PROJECT;

  return (
    <section id="projects" className="bg-dark-blue py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Nuestro Trabajo en Acción</SectionTitle>
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* YouTube Embed */}
          <div className="aspect-video w-full bg-dark-background rounded-lg overflow-hidden shadow-2xl shadow-dark-background/50 mb-8 ring-1 ring-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&loop=1&playlist=${youtubeVideoId}&rel=0&showinfo=0&color=white&modestbranding=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          
          {/* Project Details */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-light-text mb-4">{title}</h3>
            <p className="text-light-text/80 leading-relaxed max-w-3xl mx-auto">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
