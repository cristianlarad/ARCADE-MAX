export interface TaskData {
  title: string;
  description: string;
  proyect_id: string;
}

export interface TaskResponse {
  message: string;
  task: {
    id: string;
    title: string;
    description: string;
    status: number;
    completed: boolean;
    proyect_id: string;
    createdAt: string;
  };
}

interface IProject {
  id: string;
  name: string;
  color: string;
}

export interface IProyectLists {
  id: string;
  name: string;
  description: string;
  create_by: string;
  tasks: TaskData[];
  created_at: string;
}
export interface IAssignedUsers {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  create_at: string;
  proyect_id: string;
  status: number;
  assignedUsers: IAssignedUsers;
}

export type { IProject, Task };
