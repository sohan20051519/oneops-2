export enum ProjectStatus {
  Deployed = 'Deployed',
  Active = 'Active',
  Failed = 'Failed',
}

export interface Project {
  id: number;
  name: string;
  repoUrl: string;
  status: ProjectStatus;
  lastDeploy: string;
  isDeployed: boolean;
}

export enum PipelineStatus {
  Success = 'Success',
  Running = 'Running',
  Failed = 'Failed',
  Pending = 'Pending',
}

export interface PipelineStep {
  name: string;
  status: PipelineStatus;
  error?: string;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export type Tab = 'Projects' | 'Pipelines' | 'Monitoring';
