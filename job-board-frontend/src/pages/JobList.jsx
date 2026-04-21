import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ApplyModal from '../components/ApplyModal';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, isJobSeeker } = useContext(AuthContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) setJobs(jobs.filter(j => j._id !== id));
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const toggleBookmark = async (jobId) => {
    if (!user || !isJobSeeker()) return;
    
    try {
      if (bookmarkedJobs.has(jobId)) {
        // Remove bookmark
        const response = await fetch(`http://localhost:5000/api/bookmarks/${jobId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        
        if (response.ok) {
          setBookmarkedJobs(prev => {
            const newSet = new Set(prev);
            newSet.delete(jobId);
            return newSet;
          });
        }
      } else {
        // Add bookmark
        const response = await fetch('http://localhost:5000/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ jobId })
        });
        
        if (response.ok) {
          setBookmarkedJobs(prev => new Set(prev).add(jobId));
        }
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  // Fetch bookmarked jobs when user is logged in
  useEffect(() => {
    if (user && isJobSeeker()) {
      const fetchBookmarks = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/bookmarks', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          
          if (response.ok) {
            const bookmarks = await response.json();
            const bookmarkedJobIds = new Set(bookmarks.map(b => b.job._id));
            setBookmarkedJobs(bookmarkedJobIds);
          }
        } catch (error) {
          console.error('Failed to fetch bookmarks:', error);
        }
      };
      
      fetchBookmarks();
    }
  }, [user, isJobSeeker]);

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         j.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || j.location?.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || j.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  const jobTypes = [...new Set(jobs.map(job => job.type).filter(Boolean))];
  const locations = [...new Set(jobs.map(job => job.location).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600">Discover opportunities that match your skills and aspirations</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                placeholder="Search jobs, companies, or keywords..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <select 
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select 
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          {loading ? 'Loading...' : `Found ${filteredJobs.length} ${filteredJobs.length === 1 ? 'job' : 'jobs'}`}
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Latest
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Relevant
          </button>
        </div>
      </div>

      {/* Job Cards */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-32"></div>
            </div>
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group">
              {user && isJobSeeker() && (
                <button 
                  onClick={() => toggleBookmark(job._id)} 
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title={bookmarkedJobs.has(job._id) ? "Remove bookmark" : "Bookmark this job"}
                >
                  <svg 
                    className={`w-5 h-5 ${bookmarkedJobs.has(job._id) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400 hover:text-yellow-500'} transition-colors`} 
                    fill={bookmarkedJobs.has(job._id) ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              )}
              {user && user.role === 'company' && (
                <button 
                  onClick={(e) => handleDelete(e, job._id)} 
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{job.company?.charAt(0).toUpperCase() || 'J'}</span>
                    </div>
                    <div className="flex-1">
                      <Link to={`/job/${job._id}`} className="block">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors mb-1">
                          {job.title}
                        </h3>
                      </Link>
                      <p className="text-indigo-600 font-semibold text-sm mb-2">{job.company}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-3">
                        {job.location && (
                          <span className="inline-flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                        )}
                        {job.type && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            {job.type}
                          </span>
                        )}
                        {job.salary && (
                          <span className="inline-flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.salary}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setSelectedJob(job)} 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Apply Now
                  </button>
                  <Link 
                    to={`/job/${job._id}`}
                    className="text-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default JobList;