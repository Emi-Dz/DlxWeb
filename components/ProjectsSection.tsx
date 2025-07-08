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
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent-purple rounded-full"></span>
      </h2>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project, index: number }> = ({ project, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const { youtubeVideoId, title, description } = project;

    return (
        <div
            ref={ref}
            className={`bg-card-bg/50 rounded-xl shadow-2xl border border-white/10 p-6 flex flex-col transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-lg hover:shadow-accent-purple/30 ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="aspect-video w-full bg-dark-background rounded-lg overflow-hidden shadow-xl mb-6 ring-1 ring-white/10">
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&showinfo=0&color=white&modestbranding=1`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
            <div className="text-left flex-grow">
                <h3 className="text-xl font-bold text-light-text mb-3">{title}</h3>
                <p className="text-light-text/80 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="bg-dark-blue py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Nuestro Trabajo en Acción</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
