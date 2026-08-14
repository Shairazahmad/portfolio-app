import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand & Copyright */}
        <div className="text-center md:text-left">
          <Link to="/" className="text-lg font-bold text-gray-900 tracking-tight">
            Portfolio<span className="text-teal-600">.</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-900 transition">About</Link>
          <Link to="/projects" className="hover:text-gray-900 transition">Projects</Link>
          <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex items-center gap-4 text-gray-500">
          <a
            href="https://github.com/Shairazahmad"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/shairaz-ahmad-12384b272/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:shairazahmad0@gmail.com"
            className="hover:text-gray-900 transition"
            aria-label="Email Contact"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;