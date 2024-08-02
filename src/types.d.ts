export interface Tool {
  name: string;
  color?: string;
  url: string;
  icon: string;
}

export interface Projects {
  type: string;
  id: string;
  repositories: SingleProject[];
}

export interface SingleProject {
  projectName: string;
  url: string;
}
