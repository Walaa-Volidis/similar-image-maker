import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="border-b bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
              <circle cx="12" cy="13" r="3"></circle>
            </svg>
            <h1 className="text-2xl font-bold">ImageMirror</h1>
          </div>
          <p className="text-sm font-medium hidden md:block">Create beautiful similar images with AI</p>
        </div>
      </div>
    </nav>
  );
};
