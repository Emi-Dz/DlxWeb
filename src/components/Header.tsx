import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import { MenuIcon, XIcon } from '../constants';
import Logo from './Logo';
import { handleLinkClick } from '../utils/navigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleLinkClick(e);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-dark-blue sticky top-0 z-50 shadow-lg shadow-dark-background/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" onClick={handleNavigation} className="text-3xl font-bold text-light-text">
            <Logo className="h-8" />
          </a>
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavigation}
                    className="font-semibold text-light-text hover:text-accent-purple transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-light-text focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-dark-blue/95 backdrop-blur-sm">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavigation}
                  className="font-semibold text-light-text hover:text-accent-purple transition-colors duration-300 text-lg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;