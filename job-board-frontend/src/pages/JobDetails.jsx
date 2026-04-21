import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApplyModal from '../components/ApplyModal';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/jobs`);
        const data = await response.json();
        const foundJob = data.find(j => j._id === id);
        
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError('Job not found');
        }
      } catch (error) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The job you\'re looking for doesn\'t exist or has been removed.'}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const postedDate = new Date(job.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="group text-indigo-600 font-semibold mb-6 flex items-center gap-2 hover:text-indigo-700 transition-colors"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </button>

        {/* Main Job Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{job.company?.charAt(0).toUpperCase() || 'J'}</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">{job.title}</h1>
                    <p className="text-indigo-100 font-medium">{job.company}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  {job.type && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                      {job.type}
                    </span>
                  )}
                  {job.location && (
                    <span className="inline-flex items-center text-sm text-indigo-100">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </span>
                  )}
                  {job.salary && (
                    <span className="inline-flex items-center text-sm text-indigo-100">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </span>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            {/* Job Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  {job.description}
                </p>
              </div>
            </section>

            {/* Requirements */}
            {job.requirements && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                  Requirements
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    {job.requirements}
                  </p>
                </div>
              </section>
            )}

            {/* Job Details Grid */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 font-semibold text-sm uppercase mb-2">Job Type</p>
                  <p className="text-gray-900 font-semibold">{job.type || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 font-semibold text-sm uppercase mb-2">Location</p>
                  <p className="text-gray-900 font-semibold">{job.location || 'Not specified'}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 font-semibold text-sm uppercase mb-2">Salary</p>
                  <p className="text-gray-900 font-semibold">{job.salary || 'Competitive'}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 font-semibold text-sm uppercase mb-2">Posted</p>
                  <p className="text-gray-900 font-semibold">{postedDate}</p>
                </div>
              </div>
            </section>

            {/* Apply Button CTA */}
            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to apply?</h3>
                <p className="text-gray-600 mb-6">Take the next step in your career and join this amazing team.</p>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Apply for This Position
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Similar Jobs Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-gray-600">More jobs like this will appear here soon.</p>
          </div>
        </div>
      </div>

      {showModal && <ApplyModal job={job} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default JobDetails;