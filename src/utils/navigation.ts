import React from 'react';

/**
 * Handles all internal link clicks for a seamless Single Page Application (SPA) experience.
 * It prevents full page reloads, manages navigation between different pages of the app,
 * and handles smooth scrolling to anchor links (#) on the same page.
 * This implementation is robust against sandbox/iframe cross-origin restrictions.
 * @param e The React mouse event from a clicked anchor tag.
 */
export const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  const link = e.currentTarget;
  const href = link.getAttribute('href');

  // Let browser handle special cases: no href, external links, new tabs, or non-web protocols.
  if (!href || href.startsWith('http') || link.target === '_blank' || (!href.startsWith('/') && !href.startsWith('#'))) {
    return;
  }

  e.preventDefault();

  try {
    // Resolve the relative href to a full URL based on the current location.
    // This is crucial for sandboxed environments where relative paths in pushState can be misinterpereted.
    const targetUrl = new URL(href, window.location.href);
    const currentUrl = new URL(window.location.href);

    // If we're already at the target URL, do nothing.
    if (targetUrl.href === currentUrl.href) {
      return;
    }

    // Case 1: Same page path, but different hash (i.e., anchor link).
    const isSamePageScroll = targetUrl.pathname === currentUrl.pathname && targetUrl.hash;
    if (isSamePageScroll) {
      const element = document.querySelector(targetUrl.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Use replaceState to update the URL without adding a new entry to the browser history.
        // This is better UX for simple same-page scrolls.
        history.replaceState(null, '', targetUrl.href);
      }
      return;
    }
    
    // Case 2: Navigating to a different page (or a different page with a hash).
    // Use the fully-resolved URL in pushState to prevent cross-origin errors.
    history.pushState({}, '', targetUrl.href);
    window.dispatchEvent(new Event('navigate'));

  } catch (error) {
    console.error(`SPA navigation failed for href="${href}". Falling back to standard navigation.`, error);
    // As a last resort, let the browser handle it.
    window.location.assign(href);
  }
};