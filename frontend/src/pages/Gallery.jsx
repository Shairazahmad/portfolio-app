import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ImageOff } from 'lucide-react';
import { fetchGithubProjects } from '../services/api';

const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('web'); // 'web' | 'app'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchProjects();
        setProjects(res.data);
      } catch (err) {
        console.error('Error loading gallery projects:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Flatten every image from every project matching the active tab,
  // tagging each with its parent project title for alt text.
  const screenshots = useMemo(() => {
    return projects
      .filter((proj) => (proj.platform || 'web') === activeTab)
      .flatMap((proj) =>
        (proj.images || []).map((src, index) => ({
          src,
          key: `${proj._id}-${index}`,
          title: proj.title,
        }))
      );
  }, [projects, activeTab]);

  const tabs = [
    { id: 'web', label: 'Web' },
    { id: 'app', label: 'App' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-10">

      {/* Header */}
      <section className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gallery</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Project Screenshots
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          A closer look at the interfaces I've built, sorted by platform.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-gray-200 p-1 bg-white shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      {loading ? (
        <p className="text-center text-sm text-gray-500 py-16">Loading screenshots...</p>
      ) : screenshots.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
          <ImageOff className="w-10 h-10" />
          <p className="text-sm">
            No {activeTab === 'web' ? 'web' : 'app'} screenshots uploaded yet.
          </p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
          {screenshots.map((shot) => (
            <a
              key={shot.key}
              href={shot.src}
              target="_blank"
              rel="noreferrer"
              className="block mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={shot.src}
                alt={shot.title}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
