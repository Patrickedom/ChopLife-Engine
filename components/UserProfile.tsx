import React, { useState, useEffect } from 'react';
import type { UserProfile as UserProfileType } from '../types';

interface UserProfileProps {
  profile: UserProfileType;
  onSave: (profile: UserProfileType) => void;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState<UserProfileType>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={e => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <div className="p-6 border-b border-slate-200">
            <h2 id="profile-modal-title" className="text-xl font-bold text-slate-800">Your Profile</h2>
            <p className="text-sm text-slate-500 mt-1">This helps me give you more personalized advice.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="e.g., Adaobi" className="w-full px-3 py-2 text-base bg-white border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 placeholder:text-slate-400" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} placeholder="e.g., Lagos, Nigeria" className="w-full px-3 py-2 text-base bg-white border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 placeholder:text-slate-400" />
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-slate-700 mb-1">Skills</label>
              <textarea name="skills" id="skills" value={formData.skills} onChange={handleChange} rows={3} placeholder="e.g., Writing, graphic design, coding" className="w-full px-3 py-2 text-base bg-white border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 placeholder:text-slate-400"></textarea>
            </div>
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-slate-700 mb-1">Financial Goals</label>
              <textarea name="goals" id="goals" value={formData.goals} onChange={handleChange} rows={3} placeholder="e.g., Earn a side income of ₦50,000/month" className="w-full px-3 py-2 text-base bg-white border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 placeholder:text-slate-400"></textarea>
            </div>
          </div>
          <div className="bg-slate-50 px-6 py-4 flex justify-end space-x-3 rounded-b-xl">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
