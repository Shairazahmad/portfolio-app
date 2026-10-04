import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle, AlertCircle, Send, MapPin, Clock, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../config/data';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Web Development', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      setTimeout(() => {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: 'Web Development', message: '' });
      }, 1000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again later.' });
    }
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
          Let’s Connect &amp; Collaborate
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Have a project in mind, need custom web or mobile development, or want to discuss potential software solutions? Drop me a message below.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Key Contact Details */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Contact Info
            </h3>
            
            <a
              href={PERSONAL_INFO.socials.emailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="truncate font-medium">{PERSONAL_INFO.email}</span>
            </a>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-medium">{PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-medium">Response time: ~24 hrs</span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-3">
                Hire On Freelance
              </span>
              <a
                href={PERSONAL_INFO.socials.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
              >
                <Globe className="w-3.5 h-3.5" />
                Fiverr Profile
              </a>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="John Doe"
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
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 tracking-wider mb-2">
                Service / Inquiry Type
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition"
              >
                <option value="Web Development">Web Development</option>
                <option value="App Development">Mobile App Development</option>
                <option value="Bug Fixes & Optimization">Bug Fixes &amp; Code Optimization</option>
                <option value="UI/UX Design">Graphic &amp; UI Design</option>
                <option value="General Inquiry">General Discussion</option>
              </select>
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
                placeholder="Tell me about your project requirements or inquiry..."
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