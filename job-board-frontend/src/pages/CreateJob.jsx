import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    type: '',
    salary: '',
    requirements: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.type) newErrors.type = 'Job type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const user = JSON.parse(localStorage.getItem('user')); 
    const token = user ? user.token : null;

    if (!token) {
      setErrors({ submit: 'Please login to post a job' });
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:5000/api/jobs', formData, config);
      setSuccess(true);
      setFormData({ 
        title: '', 
        company: '', 
        description: '', 
        location: '', 
        type: '', 
        salary: '', 
        requirements: '' 
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error("Post failed:", err.response?.data?.message || err.message);
      setErrors({ submit: err.response?.data?.message || 'Failed to post job. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
          <p className="text-gray-600 mb-4">Your job listing has been posted and is now live.</p>
          <p className="text-sm text-gray-500">Redirecting to job listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">Find the perfect candidate for your open position</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{errors.submit}</p>
            </div>
          )}
          
          <form onSubmit={handlePostJob} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="e.g. Senior Frontend Engineer" 
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                    errors.title ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="company"
                  placeholder="e.g. Tech Innovations Inc." 
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                    errors.company ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={formData.company}
                  onChange={handleChange}
                />
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="location"
                  placeholder="e.g. San Francisco, CA" 
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                    errors.location ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select 
                  name="type"
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                    errors.type ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select job type</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Salary Range
              </label>
              <input 
                type="text" 
                name="salary"
                placeholder="e.g. $80,000 - $120,000" 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
                <span className="text-xs font-normal text-gray-500 ml-2">(Minimum 50 characters)</span>
              </label>
              <textarea 
                name="description"
                placeholder="Provide a detailed description of the role, responsibilities, and what you're looking for in a candidate..." 
                rows="6"
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-200'
                }`}
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              <p className="mt-1 text-xs text-gray-500">
                {formData.description.length}/50 characters minimum
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirements (Optional)
              </label>
              <textarea 
                name="requirements"
                placeholder="List the key requirements, qualifications, and skills needed for this position..." 
                rows="4"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-colors"
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Posting...' : 'Post Job Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;