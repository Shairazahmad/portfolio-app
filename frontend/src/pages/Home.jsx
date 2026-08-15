import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] -my-6 w-screen min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop"
          alt="Developer Workspace"
          className="w-full h-full object-cover object-center opacity-30"
        />
        {/* Soft off-white gradient tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-2xl px-6 py-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Web & App Developer
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 font-medium max-w-lg mx-auto">
          Building full-stack web applications, backend APIs, and modern user experiences.
        </p>

        <div>
          <Link
            to="/about"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs tracking-wider uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            About Me
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Home;