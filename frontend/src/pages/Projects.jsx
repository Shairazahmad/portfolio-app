import React, { useEffect, useState } from 'react';
import { fetchGithubProjects, fetchLanguageSummary, GITHUB_COLORS } from '../services/api';
import { Search, SlidersHorizontal, FolderGit2, ExternalLink, Code2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, langData] = await Promise.all([
          fetchGithubProjects(),
          fetchLanguageSummary(),
        ]);
        setProjects(projectsData);
        setLanguages(langData.data.languages || []);
      } catch (error) {
        console.error('Failed to load GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.language && project.language.toLowerCase().includes(query)) ||
      (project.topics && project.topics.some((topic) => topic.toLowerCase().includes(query)));

    const matchesFeatured = filterFeatured ? project.featured : true;

    return matchesSearch && matchesFeatured;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-10">
      
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Live GitHub Showcase</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          All Built Projects &amp; Applications
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Browse through my full collection of web applications, computational tools, and open-source repositories.
        </p>
      </section>

      {/* Language Color Legend Box */}
      {!loading && languages.length > 0 && (
        <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Live Language Distribution
            </span>
            <span className="text-xs font-medium text-gray-400">
              {projects.length} Total Repositories
            </span>
          </div>

          {/* Rectangular Multi-Color Bar */}
          <div className="h-3 w-full rounded-full bg-gray-100 flex overflow-hidden">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="h-full transition-all duration-500"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Color Labels */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-semibold text-gray-800">{lang.name}</span>
                <span className="text-gray-500 font-mono">({lang.percentage}%)</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Search and Filter Controls */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, description, or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setFilterFeatured(!filterFeatured)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition ${
              filterFeatured
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{filterFeatured ? 'Showing Featured Only' : 'Filter Featured'}</span>
          </button>
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="h-44 w-full bg-gray-100 overflow-hidden relative">
                  <img
                    src={project.images && project.images[0] ? project.images[0] : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60';
                    }}
                  />
                  {project.language && (
                    <span className="absolute top-3 right-3 bg-gray-900/80 text-white backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{
                          backgroundColor: GITHUB_COLORS[project.language] || '#94a3b8',
                        }}
                      />
                      {project.language}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 capitalize leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-blue-600 transition"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Code</span>
                    </a>

                    {project.liveLink && project.liveLink !== project.githubLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition ml-auto"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-500 space-y-2">
            <p className="text-base font-semibold text-gray-700">No projects match your query</p>
            <p className="text-sm">Try searching for a different keyword or clearing your filters.</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default Projects;