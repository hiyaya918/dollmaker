import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">AI Doll Image Generator</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-dark hover:text-primary transition">Home</Link>
            <a href="#features" className="text-dark hover:text-primary transition">Features</a>
            <a href="#how-it-works" className="text-dark hover:text-primary transition">How It Works</a>
          </nav>
          <button className="md:hidden focus:outline-none">
            <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 