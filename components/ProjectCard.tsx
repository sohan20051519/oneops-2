import React from 'react';
import { Project, ProjectStatus } from '../types';
import { GithubIcon, LinkIcon, PlayIcon, DotsVerticalIcon } from './icons/Icons';

interface ProjectCardProps {
  project: Project;
  onDeploy: (projectId: number) => void;
}

const statusStyles: { [key in ProjectStatus]: { bg: string; text: string } } = {
  [ProjectStatus.Deployed]: { bg: 'bg-green-100', text: 'text-green-800' },
  [ProjectStatus.Active]: { bg: 'bg-blue-100', text: 'text-blue-800' },
  [ProjectStatus.Failed]: { bg: 'bg-red-100', text: 'text-red-800' },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDeploy }) => {
  const { id, name, repoUrl, status, lastDeploy, isDeployed } = project;
  const style = statusStyles[status];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <div className={`px-3 py-1 text-xs font-semibold rounded-full ${style.bg} ${style.text}`}>
            {status}
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
          <GithubIcon className="h-4 w-4" />
          <span>{repoUrl}</span>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          <span className="font-medium text-gray-600">Last deploy:</span> {lastDeploy}
        </p>
        <p className="text-sm text-gray-500">
          {isDeployed ? 'Deployed' : 'Not Deployed'}
        </p>
      </div>
      <div className="mt-6 flex justify-between items-center border-t border-gray-200 pt-4">
        {isDeployed ? (
          <button 
            onClick={() => window.open(`https://${repoUrl.replace('github.com/', '').replace('.git', '')}.oneops.dev`, '_blank')}
            className="flex items-center space-x-2 text-sm font-medium text-primary hover:underline">
            <LinkIcon className="h-4 w-4" />
            <span>View Live</span>
          </button>
        ) : <div/>}
        <div className="flex items-center space-x-2">
           <DotsVerticalIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <button 
              onClick={() => onDeploy(id)}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
              <PlayIcon className="h-4 w-4" />
              <span>Deploy</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
