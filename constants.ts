
import { Project, ProjectStatus, PipelineStep, PipelineStatus, ChartDataPoint } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'E-commerce API',
    repoUrl: 'github.com/user/ecommerce',
    status: ProjectStatus.Deployed,
    lastDeploy: '2 hours ago',
    isDeployed: true,
  },
  {
    id: 2,
    name: 'Dashboard App',
    repoUrl: 'github.com/user/dashboard',
    status: ProjectStatus.Active,
    lastDeploy: '1 day ago',
    isDeployed: false,
  },
  {
    id: 3,
    name: 'Analytics Service',
    repoUrl: 'github.com/user/analytics',
    status: ProjectStatus.Failed,
    lastDeploy: '3 days ago',
    isDeployed: false,
  },
];

export const PIPELINE_STAGES: PipelineStep[] = [
    { name: 'Build', status: PipelineStatus.Success },
    { name: 'Test', status: PipelineStatus.Success },
    { name: 'Dockerize', status: PipelineStatus.Failed, error: "Docker build failed: Cannot find module 'express'. Ensure 'express' is listed in package.json dependencies." },
    { name: 'Deploy', status: PipelineStatus.Pending },
    { name: 'Monitor', status: PipelineStatus.Pending },
];

export const PIPELINE_STAGES_RUNNING: PipelineStep[] = [
    { name: 'Build', status: PipelineStatus.Success },
    { name: 'Test', status: PipelineStatus.Success },
    { name: 'Dockerize', status: PipelineStatus.Running },
    { name: 'Deploy', status: PipelineStatus.Pending },
    { name: 'Monitor', status: PipelineStatus.Pending },
]

const generateChartData = (base: number, variance: number): ChartDataPoint[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${12 + i}:00`,
    value: Math.floor(base + (Math.random() - 0.5) * variance),
  }));
};

export const CPU_USAGE_DATA: ChartDataPoint[] = generateChartData(40, 20);
export const MEMORY_USAGE_DATA: ChartDataPoint[] = generateChartData(450, 200);
export const REQUESTS_PER_SEC_DATA: ChartDataPoint[] = generateChartData(1000, 600);
export const RESPONSE_TIME_DATA: ChartDataPoint[] = generateChartData(45, 25);
