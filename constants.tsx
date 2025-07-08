import React from 'react';
import type { NavLink, Service, Benefit, Founder, FeaturedProject } from './types';

// Generic Icon component props
interface IconProps {
  className?: string;
}

// --- CHATBOT CONFIGURATION ---
// IMPORTANTE: Reemplaza la siguiente URL con la URL de tu webhook de n8n.
// El chatbot no funcionará hasta que esta URL sea correcta.
export const N8N_WEBHOOK_URL = 'https://dlxtech-n8n.uls4lg.easypanel.host/webhook/DlxBot';

// Specific Icons
const BrainIcon: React.FC<IconProps> = ({ className = "w-14 h-14" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 .96 .995l.04 .005h.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-2.5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 1-5 0V10a2.5 2.5 0 0 1 5 0"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v1.2a1 1 0 0 1-.96.995l-.04 .005h-.5a1.5 1.5 0 0 0-1.5 1.5v1a1.5 1.5 0 0 0 1.5 1.5h2.5a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 0-2 2v2.5a2.5 2.5 0 0 0 5 0V10a2.5 2.5 0 0 0-5 0"></path>
  </svg>
);

const RobotIcon: React.FC<IconProps> = ({ className = "w-14 h-14" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3l-1-1v-3l1-1V9a2 2 0 0 1 2-2z"></path><path d="M10 16h4"></path><circle cx="8.5" cy="11.5" r=".5" fill="currentColor"></circle><circle cx="15.5" cy="11.5" r=".5" fill="currentColor"></circle><path d="M9 7L8 3m8 4l1-4"></path>
  </svg>
);

const MobileIcon: React.FC<IconProps> = ({ className = "w-14 h-14" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="2" width="10" height="20" rx="2" ry="2"></rect><path d="M12 18h.01"></path>
  </svg>
);

const CloudIcon: React.FC<IconProps> = ({ className = "w-14 h-14" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);

const LightbulbIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18h6M10 22h4"></path><path d="M12 2a7 7 0 0 0-4.95 11.95A7 7 0 0 0 12 22a7 7 0 0 0 4.95-11.95A7 7 0 0 0 12 2z"></path>
  </svg>
);

const ChartLineIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
);

const HandsHelpingIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 12.5a3.5 3.5 0 0 1-3.5-3.5V6a3.5 3.5 0 0 1 7 0v3a3.5 3.5 0 0 1-3.5 3.5z"></path><path d="M11 12.5v7.5"></path><path d="M18 11.5a3.5 3.5 0 0 1 3.5-3.5v-3a3.5 3.5 0 0 0-7 0v3a3.5 3.5 0 0 1 3.5 3.5z"></path><path d="M18 11.5v7.5"></path><path d="M6 16.5a1.5 1.5 0 0 1 3 0V20a1.5 1.5 0 0 1-3 0z"></path>
  </svg>
);

const ShieldIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 53.79-54.3c29.7 0 53.79 24.2 53.79 54.3a53.79 53.79 0 0 1-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"></path></svg>
);

export const ProjectsIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg className={className} stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);


export const NAV_LINKS: NavLink[] = [
  { href: '#services', label: 'Servicios' },
  { href: '#benefits', label: 'Beneficios' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
];

export const SERVICES: Service[] = [
  {
    icon: <BrainIcon />,
    title: 'Soluciones con Inteligencia Artificial',
    description: 'Implementación y desarrollo de IA a medida para optimizar procesos y tomar decisiones inteligentes.',
  },
  {
    icon: <RobotIcon />,
    title: 'Automatización de Procesos',
    description: 'Diseñamos e implementamos sistemas de automatización para aumentar la eficiencia y reducir costos operativos.',
  },
  {
    icon: <MobileIcon />,
    title: 'Diseño y Desarrollo de Apps',
    description: 'Creación de aplicaciones móviles y web intuitivas y potentes, adaptadas a tus necesidades.',
  },
  
];

export const BENEFITS: Benefit[] = [
    {
      icon: <LightbulbIcon />,
      title: 'Innovación Constante',
      description: 'Nos mantenemos a la vanguardia de las últimas tecnologías para ofrecerte siempre lo mejor.',
    },
    {
      icon: <ChartLineIcon />,
      title: 'Resultados Medibles',
      description: 'Nuestras soluciones están diseñadas para generar un impacto positivo y cuantificable en tu negocio.',
    },
    {
      icon: <HandsHelpingIcon />,
      title: 'Soporte Personalizado',
      description: 'Un equipo de expertos a tu disposición para ofrecerte acompañamiento y asistencia en todo momento.',
    },
    {
      icon: <ShieldIcon />,
      title: 'Seguridad y Confianza',
      description: 'Implementamos los más altos estándares de seguridad para proteger tus datos y operaciones.',
    },
];

export const FOUNDERS: Founder[] = [
    {
      name: 'Facundo Lobos',
      title: 'Co-Founder & CEO',
      description: 'Apasionado por el aprendizaje continuo y el diseño de experiencias de usuario eficientes. En DlxTech, lidero la creación de herramientas que simplifican la vida de las personas, especializándome en optimizar procesos de negocio a través de soluciones de inteligencia artificial personalizadas y el desarrollo de aplicaciones intuitivas que entregan resultados rápidos y efectivos.',
      // Reemplaza 'user-icon' con la URL directa a tu foto de perfil.
      // Ejemplo: 'https://.../mi_foto.jpg'
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQFk0fV28-rSsg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731683658261?e=1756944000&v=beta&t=TuMl4wisEes8_5jEU-UeT2Y5a2MjH3x7yaSvXcBfvOU',
      linkedin: 'https://www.linkedin.com/in/facundo-lobos/',
      instagram: 'https://www.instagram.com/facuulobos/'
    },
    {
      name: 'Emiliano Dzisiuk',
      title: 'Co-Founder & CEO',
      description: 'Impulsado por la innovación tecnológica y la estrategia empresarial, transformo ideas complejas en realidades funcionales. Mi enfoque en DlxTech es diseñar y arquitectar soluciones robustas y escalables que resuelven los desafíos críticos del negocio. Me dedico a construir la base tecnológica que impulsa el crecimiento y la ventaja competitiva de nuestros clientes, garantizando siempre la máxima seguridad y rendimiento.',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQFqYhN9nISjzw/profile-displayphoto-crop_800_800/B4DZfOe9LCG8AM-/0/1751515911484?e=1756944000&v=beta&t=RGnrLiUiQgI6Z852gpF7vsrVAMS0af2FLd8CEfIXmZ8',
      linkedin: 'https://www.linkedin.com/in/emi-dz/',
      instagram: 'https://www.instagram.com/dzisiukemiliano/'
    }
];

// --- PROYECTO DESTACADO ---
// Edita la siguiente información para mostrar tu proyecto principal.
// Para obtener el 'youtubeVideoId', copia la parte de la URL de YouTube después de 'v='.
// Ejemplo: para 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', el ID es 'dQw4w9WgXcQ'.
export const FEATURED_PROJECT: FeaturedProject = {
    youtubeVideoId: 'UxSMm16Qc1I',
    title: 'Batalla de Salamines',
    description: 'Juego de Roblox de batalla por equipos.'
};
