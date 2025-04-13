import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} ERAS - Historical Exploration</p>
          </div>
          <div className="flex items-center">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <span className="text-xs border border-white/30 rounded px-2 py-1">
                Made on ZAPT
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;