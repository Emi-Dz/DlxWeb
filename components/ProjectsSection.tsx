import React from 'react';
import { useInView } from 'react-intersection-observer';
import { PROJECTS } from '../constants';
import type { Project } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-4xl sm:text-5xl font-bold text-light-text relative inline-block">
        {children}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-1 bg-accent-purple rounded-full"></span>
      </h2>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
    
    const { youtubeVideoId, title, description } = project;
  
    return (
      <div
        ref={ref}
        className={`flex flex-col transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{ animationDelay: `${index * 0.15}s` }}
      >
        <div className="aspect-video w-full bg-dark-background rounded-lg overflow-hidden shadow-2xl shadow-dark-background/50 mb-6 ring-1 ring-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0&showinfo=0&color=white&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold text-light-text mb-2">{title}</h3>
          <p className="text-light-text/80 leading-relaxed">{description}</p>
        </div>
      </div>
    );
  };

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="bg-dark-blue py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Nuestros Proyectos en Acción</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.youtubeVideoId} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
