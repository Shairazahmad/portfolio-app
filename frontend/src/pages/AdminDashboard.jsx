import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api/projects';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    imageUrl: '' // or multiple comma-separated URLs/base64 strings
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (err) {
      console.error('Error loading projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: '', description: '', githubLink: '', imageUrl: '' });
      fetchProjects();
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchProjects();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Admin Project Dashboard</h1>

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
          type="text"
          name="imageUrl"
          placeholder="Screenshot URL (e.g., https://... or /uploads/...)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl text-sm"
        />

        <textarea
          name="description"
          placeholder="Project Description"
          required
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl text-sm"
        />

        <button
          type="submit"
          className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-700 transition"
        >
          Add Project to Portfolio
        </button>
      </form>

      {/* Existing Projects */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Existing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj._id} className="border p-4 rounded-xl bg-white shadow-sm space-y-3">
              {proj.imageUrl && (
                <img src={proj.imageUrl} alt={proj.title} className="w-full h-40 object-cover rounded-lg" />
              )}
              <h3 className="font-bold">{proj.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{proj.description}</p>
              <div className="flex justify-between items-center pt-2">
                <a 
                  href={proj.githubLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs text-teal-600 flex items-center gap-1 font-medium"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="text-xs text-red-600 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50"
                >
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