const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  // Auth endpoints
  login: `${API_URL}/api/auth/login`,
  register: `${API_URL}/api/auth/register`,
  loginCompany: `${API_URL}/api/auth/login-company`,
  registerCompany: `${API_URL}/api/auth/register-company`,
  
  // Job endpoints
  jobs: `${API_URL}/api/jobs`,
  job: (id) => `${API_URL}/api/jobs/${id}`,
  
  // Application endpoints
  applications: `${API_URL}/api/applications`,
  companyApplications: `${API_URL}/api/applications/company`,
  
  // Profile endpoints
  profile: `${API_URL}/api/profile`,
  profilePicture: `${API_URL}/api/profile/picture`,
  
  // Bookmark endpoints
  bookmarks: `${API_URL}/api/bookmarks`,
  bookmark: (id) => `${API_URL}/api/bookmarks/${id}`,
};

export default API_URL;
