import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, isJobSeeker } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    skills: '',
    linkedin: '',
    github: '',
    portfolio: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setFormData({
            bio: data.bio || '',
            location: data.location || '',
            skills: data.skills ? data.skills.join(', ') : '',
            linkedin: data.linkedin || '',
            github: data.github || '',
            portfolio: data.portfolio || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        })
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setEditing(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await fetch('http://localhost:5000/api/profile/picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({ ...prev, profilePicture: data.profilePicture }));
        setMessage('Profile picture updated!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error uploading picture:', error);
      setMessage('Error uploading picture');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!isJobSeeker()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Available</h2>
          <p className="text-gray-600">Profile management is available for job seekers only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your professional profile and experience</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profile?.profilePicture ? (
                  <img 
                    src={`http://localhost:5000${profile.profilePicture}`} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {profile?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePictureUpload}
                  />
                </label>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{profile?.name}</h2>
                <p className="text-indigo-100">{profile?.email}</p>
                {profile?.location && <p className="text-indigo-100 text-sm mt-1">{profile.location}</p>}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {editing ? (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="JavaScript, React, Node.js (comma separated)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="GitHub URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio</label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Portfolio URL"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {profile?.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Bio</h3>
                    <p className="text-gray-900">{profile.bio}</p>
                  </div>
                )}

                {profile?.skills && profile.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
