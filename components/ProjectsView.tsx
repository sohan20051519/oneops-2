import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsViewProps {
  projects: Project[];
  onDeploy: (projectId: number) => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, onDeploy }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDeploy={onDeploy} />
      ))}
    </div>
  );
};

export default ProjectsView;
