import React from 'react';
import { FOUNDERS, LinkedInIcon, InstagramIcon, ProjectsIcon } from '../constants';
import Logo from './Logo';
import { handleLinkClick } from '../utils/navigation';

interface SocialLinkTooltipProps {
  href: string;
  label: string;
  tooltipText: string;
  children: React.ReactNode;
  isExternal?: boolean;
}

const SocialLinkWithTooltip: React.FC<SocialLinkTooltipProps> = ({ href, label, tooltipText, children, isExternal = true }) => {
    return (
      <div className="relative group">
        <a
          href={href}
          aria-label={label}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : ""}
          className="text-light-text/70 hover:text-accent-purple transform hover:scale-125 transition-all duration-300 block"
          onClick={!isExternal ? handleLinkClick : undefined}
        >
          {children}
        </a>
        <div className="absolute bottom-full mb-2 px-3 py-1.5 text-sm font-semibold text-light-text bg-card-bg rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-x-1/2 left-1/2 whitespace-nowrap">
          {tooltipText}
          <svg className="absolute text-card-bg h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
              <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
          </svg>
        </div>
      </div>
    );
};

const Footer: React.FC = () => {
  const [founder1, founder2] = FOUNDERS;

  return (
    <footer id="contact" className="bg-dark-blue border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-light-text">
        <div className="flex justify-center mb-4">
          <Logo className="h-10" />
        </div>
        <p className="text-light-text/80 mb-6">Expertos en Soluciones Tecnológicas Avanzadas</p>
        <div className="flex justify-center items-center space-x-6 mb-8">
            <SocialLinkWithTooltip href={founder1.linkedin || '#'} label={`LinkedIn de ${founder1.name}`} tooltipText={founder1.name}>
                <LinkedInIcon />
            </SocialLinkWithTooltip>
            <SocialLinkWithTooltip href={founder2.linkedin || '#'} label={`LinkedIn de ${founder2.name}`} tooltipText={founder2.name}>
                <LinkedInIcon />
            </SocialLinkWithTooltip>
             <SocialLinkWithTooltip href={founder1.instagram || '#'} label={`Instagram de ${founder1.name}`} tooltipText={founder1.name}>
                <InstagramIcon />
            </SocialLinkWithTooltip>
            <SocialLinkWithTooltip href={founder2.instagram || '#'} label={`Instagram de ${founder2.name}`} tooltipText={founder2.name}>
                <InstagramIcon />
            </SocialLinkWithTooltip>
            <SocialLinkWithTooltip href="#projects" label="Nuestros Proyectos" tooltipText="Ver Proyectos" isExternal={false}>
                <ProjectsIcon />
            </SocialLinkWithTooltip>
        </div>
        <p className="text-sm text-light-text/60">&copy; {new Date().getFullYear()} DlxTech. Todos los derechos reservados.</p>
        <p className="text-sm text-light-text/60 mt-1">Diseñado por DlxTech</p>
      </div>
    </footer>
  );
};

export default Footer;