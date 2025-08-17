import React from 'react';
import ProjectsView from './ProjectsView';
import PipelineView from './PipelineView';
import MonitoringView from './MonitoringView';
import { Tab, Project, PipelineStep } from '../types';

interface DashboardProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  projects: Project[];
  pipelineStages: PipelineStep[];
  onDeploy: (projectId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab, setActiveTab, projects, pipelineStages, onDeploy }) => {
  const tabs: Tab[] = ['Projects', 'Pipelines', 'Monitoring'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Projects':
        return <ProjectsView projects={projects} onDeploy={onDeploy} />;
      case 'Pipelines':
        return <PipelineView stages={pipelineStages} />;
      case 'Monitoring':
        return <MonitoringView />;
      default:
        return <ProjectsView projects={projects} onDeploy={onDeploy} />;
    }
  };

  return (
    <section id="dashboard-section" className="py-16 sm:py-24">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Your Projects Dashboard</h2>
        <p className="mt-4 text-lg text-gray-600">
          Manage all your deployments from one beautiful interface
        </p>
      </div>
      <div className="mt-12">
        <div className="flex justify-center">
          <div className="bg-gray-200/80 p-1 sm:p-1.5 rounded-lg flex space-x-1 sm:space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2 text-sm font-semibold rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:bg-gray-300/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8">{renderContent()}</div>
      </div>
    </section>
  );
};

export default Dashboard;