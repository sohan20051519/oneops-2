import React, { useState } from 'react';
import { XIcon, PlusIcon } from './icons/Icons';

interface NewProjectModalProps {
  onClose: () => void;
  onAddProject: (project: { repoUrl: string }) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose, onAddProject }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      onAddProject({ repoUrl });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <XIcon className="h-6 w-6"/>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Project</h2>
        <p className="text-gray-600 mb-6">Paste a Git repository URL to get started.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Repository URL
            </label>
            <input
              type="text"
              id="repoUrl"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/user/repo.git"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language / Runtime
            </label>
            <select id="language" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-shadow">
              <option>Autodetect</option>
              <option>Node.js</option>
              <option>Python</option>
              <option>Java</option>
              <option>Go</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">OneOps will automatically detect your stack, but you can override it here.</p>
          </div>
          <div className="mt-8 flex justify-end">
             <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Add Project
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default NewProjectModal;
