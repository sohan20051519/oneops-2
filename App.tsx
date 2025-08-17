import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import AiChat from './components/AiChat';
import NewProjectModal from './components/NewProjectModal';
import { Tab, Project, PipelineStep, ProjectStatus } from './types';
import { PROJECTS, PIPELINE_STAGES, PIPELINE_STAGES_RUNNING } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [pipelineKey, setPipelineKey] = useState(Date.now());
  const [currentPipeline, setCurrentPipeline] = useState<PipelineStep[]>(PIPELINE_STAGES);

  const handleDeploy = (projectId: number) => {
    const projectToDeploy = projects.find(p => p.id === projectId);
    if (!projectToDeploy) return;

    setActiveTab('Pipelines');
    setCurrentPipeline(PIPELINE_STAGES_RUNNING);
    setPipelineKey(Date.now()); // Force re-render of pipeline view

    setTimeout(() => {
      setCurrentPipeline(PIPELINE_STAGES); // The pipeline fails
      setProjects(prevProjects =>
        prevProjects.map(p =>
          p.id === projectId ? { ...p, status: ProjectStatus.Failed, isDeployed: false } : p
        )
      );
    }, 3000);
  };

  const handleAddProject = (newProject: { repoUrl: string }) => {
    const projectName = newProject.repoUrl.split('/').pop()?.replace('.git', '') || 'new-project';
    const newProjectData: Project = {
      id: projects.length + 1,
      name: projectName.charAt(0).toUpperCase() + projectName.slice(1),
      repoUrl: newProject.repoUrl,
      status: ProjectStatus.Active,
      lastDeploy: 'Never',
      isDeployed: false,
    };
    setProjects(prev => [newProjectData, ...prev]);
    setIsModalOpen(false);
    setActiveTab('Projects');
  };

  const handleNavClick = (tab: Tab) => {
    const dashboardElement = document.getElementById('dashboard-section');
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <Header onNewProject={() => setIsModalOpen(true)} onNavClick={handleNavClick} activeTab={activeTab} />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero onConnectRepo={() => setIsModalOpen(true)} />
        <Features />
        <Dashboard
          key={pipelineKey}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          projects={projects}
          pipelineStages={currentPipeline}
          onDeploy={handleDeploy}
        />
      </main>
      <AiChat />
      {isModalOpen && <NewProjectModal onClose={() => setIsModalOpen(false)} onAddProject={handleAddProject} />}
    </div>
  );
};

export default App;
