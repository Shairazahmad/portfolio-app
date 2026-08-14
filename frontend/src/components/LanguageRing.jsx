import React, { useState } from 'react';

// Distinct colors assigned to popular programming languages
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
};

const DEFAULT_COLOR = '#94a3b8';

const LanguageRing = ({ languages = [], activeLanguage, onSelectLanguage }) => {
  const [hoveredLang, setHoveredLang] = useState(null);

  if (!languages || languages.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
        No language data available yet. Add projects with GitHub links in the admin dashboard!
      </div>
    );
  }

  // SVG Donut Chart parameters
  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      
      {/* Interactive SVG Ring Chart */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {languages.map((lang) => {
            const strokeDasharray = `${(lang.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativeOffset;
            cumulativeOffset += (lang.percentage / 100) * circumference;

            const color = LANGUAGE_COLORS[lang.name] || DEFAULT_COLOR;
            const isSelected = activeLanguage === lang.name;
            const isHovered = hoveredLang === lang.name;

            return (
              <circle
                key={lang.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={isSelected || isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredLang(lang.name)}
                onMouseLeave={() => setHoveredLang(null)}
                onClick={() => onSelectLanguage(activeLanguage === lang.name ? null : lang.name)}
              />
            );
          })}
        </svg>

        {/* Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-bold text-gray-900">
            {hoveredLang || activeLanguage || 'All'}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {hoveredLang
              ? `${languages.find((l) => l.name === hoveredLang)?.percentage}%`
              : activeLanguage
              ? `${languages.find((l) => l.name === activeLanguage)?.percentage}%`
              : 'Languages'}
          </span>
        </div>
      </div>

      {/* Language Legends & Filter Chips */}
      <div className="flex flex-wrap gap-2 max-w-md justify-center md:justify-start">
        <button
          onClick={() => onSelectLanguage(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
            activeLanguage === null
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
          }`}
        >
          All Languages
        </button>

        {languages.map((lang) => {
          const color = LANGUAGE_COLORS[lang.name] || DEFAULT_COLOR;
          const isSelected = activeLanguage === lang.name;

          return (
            <button
              key={lang.name}
              onClick={() => onSelectLanguage(isSelected ? null : lang.name)}
              onMouseEnter={() => setHoveredLang(lang.name)}
              onMouseLeave={() => setHoveredLang(null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                isSelected
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: color }}
              />
              <span>{lang.name}</span>
              <span className={isSelected ? 'text-gray-300' : 'text-gray-400'}>
                {lang.percentage}%
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default LanguageRing;