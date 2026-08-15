import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    // Simple simulated submission handler
    setTimeout(() => {
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      
      {/* Header */}
      <section className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Let’s Connect & Collaborate
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Have a project in mind, an inquiry about my work, or want to discuss software development opportunities? Feel free to drop me a message.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Direct Links */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Direct Channels</h3>
            
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="truncate">contact@example.com</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-800 shrink-0">
                <FaGithub className="w-4 h-4" />
              </div>
              <span>GitHub Profile</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <FaLinkedin className="w-4 h-4" />
              </div>
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm md:col-span-2">
          {status.success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {status.error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{status.error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{status.loading ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;