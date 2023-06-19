import { Request, Response, NextFunction } from "express";
import TaskService from "../services/Task.service";

export default class TaskController {
  private service: TaskService;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction
  ) {
    this.service = new TaskService();
  }

  public async createNewTask() {
    const { body } = this.req;
    const { status, message } = await this.service.createNewTask(body);
    return this.res.status(status).json(message);
  }

  public async getAllTasks() {
    const { token } = this.req.params;
    const { status, message } = await this.service.getAllTasks({ token });
    return this.res.status(status).json(message);
  }

  public async updateOneTask() {
    const { taskId, token } = this.req.params;
    const { ...update } = this.req.body;
    const { status, message } = await this.service.updateOneTask({
      taskId,
      token,
      update,
    });
    return this.res.status(status).json(message);
  }

  public async deleteOneTask() {
    const { taskId, token } = this.req.params;
    const { status, message } = await this.service.deleteOneTask({
      taskId,
      token,
    });
    return this.res.status(status).json(message);
  }
}
