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
    const { body } = this.req;
    const { status, message } = await this.service.getAllTasks(body);
    return this.res.status(status).json(message);
  }
  /*
  public async updateOneTask() {
    const { id, ...update } = this.req.body;
    const { status, message } = await this.service.updateOneTask(id, update);
    return this.res.status(status).json(message);
  }
    */

  public async deleteOneTask() {
    const { body } = this.req.
    const { status, message } = await this.service.deleteOneTask(body);
    return this.res.status(status).json(message);
  }
}
