import React from 'react';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../config/data';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#E9E8E6]/60 backdrop-blur-xl border-t border-black/10 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-4 text-center">
        
        {/* Top: Copyright & Name */}
        <p className="text-sm text-gray-700">
          © Copyright <span className="font-bold text-gray-900">{PERSONAL_INFO.name.split(' ')[0]}</span>. All Rights Reserved
        </p>

        {/* Middle: Circular Social Media Icons */}
        <div className="flex items-center justify-center gap-3">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:text-blue-700 hover:border-blue-700 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:text-blue-700 hover:border-blue-700 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>

          <a
            href={PERSONAL_INFO.socials.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            title="Fiverr Profile"
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:text-blue-700 hover:border-blue-700 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M22.5 16.25v-10h-10v-.625c0-1.034.841-1.875 1.875-1.875H16.25V0h-1.875A5.632 5.632 0 0 0 8.75 5.625v.625H6.25V10h2.5v6.25H6.25V20h8.75v-3.75h-2.5V10h6.25v6.25h-2.5V20H25v-3.75h-2.5z"/>
              <circle cx="20.625" cy="1.875" r="1.875"/>
            </svg>
          </a>

          <a
            href={PERSONAL_INFO.socials.emailCompose}
            target="_blank"
            rel="noopener noreferrer"
            title="Send Email via Gmail"
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:text-blue-700 hover:border-blue-700 transition"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom: Designation */}
        <p className="text-xs text-gray-600">
          {PERSONAL_INFO.title}
        </p>

      </div>
    </footer>
  );
};

export default Footer;