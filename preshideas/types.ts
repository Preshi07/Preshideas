export interface WorkflowStep {
  step: number;
  title: string;
  tool: string;
  description: string;
}

export interface AgentConfig {
  name: string;
  role: string;
  instructions: string[];
  capabilities: string[];
}

export enum DemoState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
