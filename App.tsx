import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
      // Only scroll to the top of the page if no hash is present in the URL.
      // Scrolling to a hash is handled by the page components themselves.
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    };

    // This custom event allows components to trigger navigation programmatically.
    window.addEventListener('navigate', onLocationChange);
    // This handles the browser's back/forward buttons.
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('navigate', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // The /demo route is no longer needed as projects are on the landing page.
  return <LandingPage />;
};

export default App;
