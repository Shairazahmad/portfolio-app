import React from 'react';
import {
  Code2,
  GraduationCap,
  Cpu,
  Terminal,
  Globe,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

const About = () => {
  const skills = {
    Frontend: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3', 'Vite', 'REST APIs'],
    Backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Auth', 'RESTful Services'],
    'Tools & Environment': ['Git & GitHub', 'VS Code', 'Postman', 'Cloudinary', 'npm/yarn'],
    'Core Computer Science': [
      'Web Engineering',
      'Numerical Analysis',
      'Parallel & Distributed Computing',
      'System Logic & Algorithms',
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-16">
      
      {/* Intro / Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Me</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Full-Stack Web & App Developer with a passion for problem solving.
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed pt-2">
          I build scalable web applications, modern interactive interfaces, and clean backend APIs. 
          Driven by solid software engineering principles, computational algorithms, and performance optimization, 
          I focus on turning complex technical problems into seamless digital experiences.
        </p>
      </section>

      {/* Focus Areas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Full-Stack Development</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Designing responsive single-page interfaces connected to structured REST backends and MongoDB databases.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">System Logic & Architecture</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Building modular components, optimizing computational workflows, and structuring manageable codebases.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">API Integrations</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Integrating external developer APIs—such as GitHub API byte-analytics and Cloudinary cloud storage solutions.
          </p>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Layers className="w-6 h-6 text-blue-600" />
          <h2>Technical Skills & Concepts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <div
              key={category}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-4"
            >
              <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">
                {category}
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {skillList.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Academic Background */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <h2>Education & Academic Focus</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-lg font-bold text-gray-900">
              Bachelor of Science in Computer Science / Software Engineering
            </h3>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full w-fit">
              Undergraduate
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Focused on core computational theory, algorithms, numerical models, parallel processing logic, and full-stack web engineering standards.
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;