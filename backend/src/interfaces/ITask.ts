export default interface ITask {
  id?: string;
  title: string;
  description: string;
}

export interface ITaskWithToken {
  token: string;
  title: string;
  description: string;
}
