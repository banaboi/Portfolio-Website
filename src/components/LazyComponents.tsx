import React, { Suspense, lazy } from 'react';
import DeathStarLoader from './DeathStarLoader';

// Lazy load heavy components
const AboutMe = lazy(() => import('./AboutMe'));
const Skills = lazy(() => import('./Skills'));
const ProjectsSection = lazy(() => import('./ProjectsSection'));
const ContactMe = lazy(() => import('./ContactMe'));

interface LazyComponentProps {
  children?: React.ReactNode;
}

const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px' 
  }}>
    <DeathStarLoader message="Loading component..." size={40} />
  </div>
);

export const LazyAboutMe: React.FC<LazyComponentProps> = () => (
  <Suspense fallback={<LoadingFallback />}>
    <AboutMe />
  </Suspense>
);

export const LazySkills: React.FC<LazyComponentProps> = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Skills />
  </Suspense>
);

export const LazyProjectsSection: React.FC<LazyComponentProps> = () => (
  <Suspense fallback={<LoadingFallback />}>
    <ProjectsSection />
  </Suspense>
);

export const LazyContactMe: React.FC<LazyComponentProps> = () => (
  <Suspense fallback={<LoadingFallback />}>
    <ContactMe />
  </Suspense>
);
