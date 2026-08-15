import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { Search, SlidersHorizontal, FolderGit2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.data || []);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on search query and featured status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.languages &&
        Object.keys(project.languages).some((lang) =>
          lang.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesFeatured = filterFeatured ? project.featured : true;

    return matchesSearch && matchesFeatured;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-10">
      
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint-50 border border-mint-200 text-mint-800 text-xs font-semibold">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Project Gallery</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          All Built Projects & Applications
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Browse through my full collection of web applications, computational tools, and open-source repositories.
        </p>
      </section>

      {/* Search and Filter Controls */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, description, or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-mint-600 focus:bg-white transition"
          />
        </div>

        {/* Featured Filter Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setFilterFeatured(!filterFeatured)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition ${
              filterFeatured
                ? 'bg-mint-600 text-white border-mint-600'
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
              <ProjectCard key={project._id} project={project} />
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