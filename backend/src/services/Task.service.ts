import ITask, { ITaskWithToken } from "../interfaces/ITask";
import IController from "../interfaces/IController";
import StatusHttp from "../interfaces/StatusHttps";
import UserODM from "../database/models/userODM";
import verify from "../utils/Jwt.utils";
import IUser from "../interfaces/IUser";

export default class TaskService {
  private model: UserODM;

  constructor() {
    this.model = new UserODM();
  }

  public async createNewTask({
    title,
    description,
    token,
  }: ITaskWithToken): Promise<IController<ITask | string | Error | null>> {
    try {
      const user = verify(token as string) as IUser;
      if (user) {
        const newTask = await this.model.createNewTask({
          title,
          description,
          id: user.id,
        });
        return {
          status: StatusHttp.CREATED,
          message: newTask,
        };
      }
      throw new Error();
    } catch (error) {
      return {
        status: StatusHttp.INTERNAL_SERVER_ERROR,
        message:
          "sorry, looks like there was some internal problem, this is not your fault",
      };
    }
  }

  public async getAllTasks({
    token,
  }: {
    token: string;
  }): Promise<IController<string | ITask[] | null | unknown>> {
    try {
      const user = verify(token as string) as IUser;
      if (user) {
        const tasks = await this.model.getAllTasks(user.id as string);
        return {
          status: StatusHttp.OK,
          message: tasks.tasks,
        };
      }
      throw new Error();
    } catch (error) {
      return {
        status: StatusHttp.INTERNAL_SERVER_ERROR,
        message:
          "sorry, looks like there was some internal problem, this is not your fault",
      };
    }
  }

  public async deleteOneTask({
    token,
    taskId,
  }: {
    token: string;
    taskId: string;
  }): Promise<IController<string>> {
    try {
      const user = verify(token as string) as IUser;
      if (user) {
        await this.model.deleteOneTask({ userId: user.id as string, taskId });
        return { status: StatusHttp.OK, message: "successfully deleted" };
      }
      throw new Error();
    } catch (error) {
      return { status: StatusHttp.NOT_FOUND, message: "id not found" };
    }
  }

  public async updateOneTask({
    taskId,
    token,
    update,
  }: {
    taskId: string;
    token: string;
    update: ITask;
  }): Promise<IController<string>> {
    try {
      const user = verify(token as string) as IUser;
      if (user) {
        await this.model.updateOneTask({
          userId: user.id as string,
          taskId,
          update,
        });
        return { status: StatusHttp.OK, message: "task updated" };
      }
      throw new Error();
    } catch (error) {
      return {
        status: StatusHttp.INTERNAL_SERVER_ERROR,
        message:
          "sorry, looks like there was some internal problem, this is not your fault",
      };
    }
  }
}
