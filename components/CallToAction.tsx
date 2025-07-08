import React from 'react';
import { useInView } from 'react-intersection-observer';

interface CallToActionProps {
  onOpenContactModal: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="text-center mb-8">
      <h2 className="text-4xl sm:text-5xl font-bold text-light-text relative inline-block">
        {children}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent-purple rounded-full"></span>
      </h2>
    </div>
  );

const CallToAction: React.FC<CallToActionProps> = ({ onOpenContactModal }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section id="specific-services" className="py-20 sm:py-28 text-center">
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <SectionTitle>Soluciones a tu medida.</SectionTitle>
        <p className="text-lg text-light-text/90 max-w-3xl mx-auto mb-10">
          En DlxTech, entendemos que cada negocio es único. Permítenos ayudarte a explorar cómo nuestras soluciones avanzadas pueden impulsar tu crecimiento.
        </p>
        <button
          onClick={onOpenContactModal}
          className="inline-block bg-button-bg text-light-text text-lg font-semibold px-10 py-5 rounded-lg shadow-lg hover:bg-button-hover hover:scale-105 transform transition-all duration-300 ease-in-out cursor-pointer"
        >
          Hablemos de tu Proyecto
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
