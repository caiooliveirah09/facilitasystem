import ITask from "./ITask";

export default interface IGetOneUser {
  email: string;
  tasks?: ITask[];
}
