import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, githubLink, liveLink, images, languages, featured } = project;

  // Extract top languages sorted by byte count
  const langList = languages ? Object.keys(languages) : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full group">
      
      {/* Project Screenshot / Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {images && images.length > 0 ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Screenshot Provided
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-mint-600 transition">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Languages / Tech Stack Badges */}
        {langList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {langList.slice(0, 4).map((lang) => (
              <span
                key={lang}
                className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full"
              >
                {lang}
              </span>
            ))}
            {langList.length > 4 && (
              <span className="text-[11px] font-medium text-gray-400 px-1 py-0.5">
                +{langList.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Links Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
          {githubLink ? (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-medium transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>Source Code</span>
            </a>
          ) : (
            <span />
          )}

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-mint-600 hover:text-mint-700 font-medium transition"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;