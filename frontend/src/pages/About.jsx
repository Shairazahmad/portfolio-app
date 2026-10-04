import React from 'react';
import {
  Cpu,
  Terminal,
  Globe,
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import profilePhoto from '../assets/profile.jpg';
import { PERSONAL_INFO } from '../config/data';

const About = () => {
  const skills = {
    Frontend: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3', 'Vite', 'REST APIs'],
    Backend: ['Node.js', 'Express.js', 'MongoDB', 'RESTful Services'],
    'Tools & Environment': ['Git & GitHub', 'VS Code', 'Postman', 'npm/yarn'],
    'Core Computer Science': [
      'Web Engineering',
      'Numerical Analysis',
      'Parallel & Distributed Computing',
      'System Logic & Algorithms',
    ],
  };

  const infoItems = [
    { label: 'Email', value: PERSONAL_INFO.email || 'shairazahmad0@gmail.com' },
    { label: 'Phone', value: PERSONAL_INFO.phone || '+92 321 6713204' },
    { label: 'Freelance', value: 'Available for projects' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-16">

      {/* Profile Header */}
      <section className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Me</span>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-blue-50 aspect-[4/5] md:aspect-auto md:h-full">
            <img
              src={profilePhoto}
              alt="Shairaz Ahmad"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Full-Stack Web &amp; App Developer
              </h1>
              <p className="text-gray-500 italic mt-2">
                Building scalable web applications, modern interfaces, and clean backend APIs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-sm">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-semibold text-gray-900">{item.label}:</span>
                  <span className="text-gray-600 truncate">{item.value}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed pt-1">
              I build scalable web applications, modern interactive interfaces, and clean
              backend APIs. Driven by solid software engineering principles, computational
              algorithms, and performance optimization, I focus on turning complex technical
              problems into seamless digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Full-Stack Development</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Designing responsive single-page interfaces connected to structured APIs and scalable backends.
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
            Integrating external developer APIs, data processing pipelines, and automated cloud integrations.
          </p>
        </div>
      </section>

      {/* Technical Skills & Concepts */}
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

    </div>
  );
};

export default About;