import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ExternalLink, ImageIcon, X } from 'lucide-react';
import { fetchProjects, createProject, deleteProject } from '../services/api';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    liveLink: '',
    featured: false,
    platform: 'web', // 'web' | 'app'
  });

  const [imageFiles, setImageFiles] = useState([]); // File[]
  const [imagePreviews, setImagePreviews] = useState([]); // object URLs

  const loadProjects = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Could not load projects.');
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // max 5, matches backend multer limit
    setImageFiles(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const removeSelectedImage = (index) => {
    const nextFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(nextFiles);
    setImagePreviews(nextFiles.map((file) => URL.createObjectURL(file)));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      githubLink: '',
      liveLink: '',
      featured: false,
      platform: 'web',
    });
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('githubLink', formData.githubLink);
      data.append('liveLink', formData.liveLink);
      data.append('featured', formData.featured);
      data.append('platform', formData.platform);

      // Field name must be "images" to match backend: upload.array('images', 5)
      imageFiles.forEach((file) => data.append('images', file));

      await createProject(data);
      resetForm();
      loadProjects();
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.message || 'Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Admin Project Dashboard</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold">Upload New Project</h2>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl text-sm"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="url"
            name="githubLink"
            placeholder="GitHub Repository URL"
            required
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm"
          />
          <input
            type="url"
            name="liveLink"
            placeholder="Live Demo URL (optional)"
            value={formData.liveLink}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm"
          />
        </div>

        <textarea
          name="description"
          placeholder="Project Description"
          required
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl text-sm"
        />

        {/* Platform toggle: Web / App */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Platform</label>
          <div className="inline-flex rounded-xl border border-gray-200 p-1 bg-gray-50">
            {['web', 'app'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData({ ...formData, platform: option })}
                className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition ${
                  formData.platform === option
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Controls which tab this project's screenshots appear under on the Gallery page.
          </p>
        </div>

        {/* Screenshot upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Screenshots (up to 5)
          </label>
          <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 cursor-pointer hover:border-blue-400 hover:text-blue-600 transition">
            <ImageIcon className="w-4 h-4" />
            <span>Click to select image files</span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
              {imagePreviews.map((src, index) => (
                <div key={src} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeSelectedImage(index)}
                    className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Mark as Featured
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          <Plus className="w-4 h-4" />
          {loading ? 'Uploading...' : 'Add Project to Portfolio'}
        </button>
      </form>

      {/* Existing Projects */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Existing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj._id} className="border p-4 rounded-xl bg-white shadow-sm space-y-3">
              {proj.images && proj.images.length > 0 && (
                <img
                  src={proj.images[0]}
                  alt={proj.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold">{proj.title}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  {proj.platform || 'web'}
                </span>
                {proj.featured && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{proj.description}</p>
              <p className="text-[11px] text-gray-400">
                {proj.images ? proj.images.length : 0} screenshot{proj.images?.length === 1 ? '' : 's'}
              </p>
              <div className="flex justify-between items-center pt-2">
                <a
                  href={proj.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 flex items-center gap-1 font-medium"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="text-xs text-red-600 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
