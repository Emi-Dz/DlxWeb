import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Founders from '../components/Founders';
import CallToAction from '../components/CallToAction';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const LandingPage: React.FC = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const { hash } = window.location;
    // If there's a hash in the URL, try to scroll to it.
    if (hash && hash !== '#') {
      
      /**
       * A robust function to scroll to an element. It retries a few times
       * using requestAnimationFrame to ensure the element is in the DOM
       * after a page navigation, preventing race conditions.
       */
      const robustScrollTo = (selector: string, retries = 5) => {
        if (retries < 0) return; // Stop if element is not found after several tries.
        
        try {
          const element = document.querySelector(selector);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Element not found, wait for the next frame and try again.
            requestAnimationFrame(() => robustScrollTo(selector, retries - 1));
          }
        } catch (e) {
          // This catches invalid selector syntax in the hash.
          console.error(`Failed to scroll to element with selector '${selector}':`, e);
        }
      };
      
      robustScrollTo(hash);
    }
  }, []); // Run only when the component mounts

  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        <Hero onOpenContactModal={() => setContactModalOpen(true)} />
        <Services />
        <Benefits />
        <ProjectsSection />
        <Founders />
        <CallToAction onOpenContactModal={() => setContactModalOpen(true)} />
      </main>
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
};

export default LandingPage;
