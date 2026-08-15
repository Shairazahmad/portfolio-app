import React from 'react';
import {
  Sparkles,
  Mail,
  Phone,
  Download,
  GraduationCap,
  Languages,
  BookOpen,
  Briefcase,
  Layers,
  CheckCircle2,
  Award,
} from 'lucide-react';

const Resume = () => {
  const coursework = [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Digital Image Processing',
    'Web Development (HTML/CSS/JS/PHP)',
    'Database Management Systems',
    'Artificial Intelligence',
  ];

  const expertise = {
    'Frontend Web': ['HTML5', 'CSS3', 'JS ES6+'],
    Databases: ['SQL', 'MongoDB'],
    'Mobile Development': ['Android Studio', 'Java', 'XML Layouts', 'OOP'],
    'Version Control & Tools': ['Git', 'GitHub', 'VS Code'],
    'Additional Languages & Tools': ['ASM', 'C++', 'Python', 'Matlab', 'DOSBox'],
  };

  const languages = [
    { name: 'Urdu', level: 'Native' },
    { name: 'English', level: 'Professional' },
    { name: 'Punjabi', level: 'Native' },
  ];

  const achievements = [
    {
      title: 'Currently Learning MERN Stack',
      description:
        'Self-studying Express, React, and Node.js to expand into full-stack development.',
    },
    {
      title: 'Assembly Language Programming',
      description:
        'Wrote assembly programs using NASM and DOSBox, gaining hands-on experience with registers, memory management, and low-level system operations.',
    },
    {
      title: 'Database Coursework',
      description:
        'Applied SQL and MongoDB in university projects: schema design, queries, and CRUD operations.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-16">

      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Resume</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Shairaz Ahmad
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed pt-2 max-w-2xl">
          CS undergraduate at GCUF (7th of 8 semesters). Hands-on experience in frontend
          web development, SQL &amp; MongoDB databases, and Android app development with
          Java. Currently learning full-stack (MERN) and seeking an internship to apply
          skills professionally.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <a
            href="mailto:shairazahmad0@gmail.com"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            shairazahmad0@gmail.com
          </a>
          <a
            href="tel:+923216713204"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            +92 321 6713204
          </a>
          <a
            href="/resume-shairaz-ahmad.pdf"
            download
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </section>

      {/* Two column: Education/Languages | Coursework/Project Experience */}
      <section className="grid md:grid-cols-2 gap-x-10 gap-y-14">

        {/* Left column */}
        <div className="space-y-14">

          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <h2>Education</h2>
            </div>

            <div className="relative pl-6 border-l-2 border-blue-100">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-gray-900">
                    Bachelor of Science in Computer Science
                  </h3>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full w-fit shrink-0">
                    In Progress
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Government College University Faisalabad (GCUF), Pakistan
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500 pt-1">
                  <span>2023 – 2027</span>
                  <span>Semester: 7th of 8</span>
                  <span>CGPA: 3.6 / 4.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Languages className="w-6 h-6 text-blue-600" />
              <h2>Languages</h2>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm divide-y divide-gray-100">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm font-medium text-gray-900">{lang.name}</span>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column */}
        <div className="space-y-14">

          {/* Relevant Coursework */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2>Relevant Coursework</h2>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                {coursework.map((course) => (
                  <li key={course} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Project Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2>Project Experience</h2>
            </div>

            <div className="relative pl-6 border-l-2 border-blue-100">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-gray-900">
                    Android Application Development
                  </h3>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full w-fit shrink-0">
                    Java · XML
                  </span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Academic Project · Mobile Application Development Course
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Designed and built an Android app using Android Studio, Java, and XML
                  layouts. Implemented multi-screen navigation and applied OOP principles
                  throughout.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Technical Expertise */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Layers className="w-6 h-6 text-blue-600" />
          <h2>Technical Expertise</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(expertise).map(([category, items]) => (
            <div
              key={category}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-4"
            >
              <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">
                {category}
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements & Activities */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Award className="w-6 h-6 text-blue-600" />
          <h2>Achievements & Activities</h2>
        </div>

        <div className="space-y-4">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Resume;
