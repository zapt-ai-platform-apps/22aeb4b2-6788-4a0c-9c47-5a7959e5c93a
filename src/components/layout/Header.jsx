import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=48&height=48" 
            alt="ERAS Logo"
            className="h-10 w-10" 
          />
          <h1 className="text-2xl font-serif font-bold text-indigo-800">ERAS</h1>
        </Link>
        <div className="text-sm text-gray-600">
          Explore History Through Time
        </div>
      </div>
    </header>
  );
};

export default Header;