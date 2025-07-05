import type React from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface SocialLink {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export interface Founder {
  name: string;
  title: string;
  description: string;
  image: string;
  linkedin?: string;
  instagram?: string;
}

export interface Project {
  youtubeVideoId: string;
  title: string;
  description: string;
}
