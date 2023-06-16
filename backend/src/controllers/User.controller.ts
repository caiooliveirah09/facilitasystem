import { Request, Response, NextFunction } from "express";
import StatusHttp from "../interfaces/StatusHttps";
import UserService from "../services/User.service";

export default class UserController {
  private service: UserService;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction
  ) {
    this.service = new UserService();
  }

  public async createNewUser() {
    const { body } = this.req;
    const { status, message } = await this.service.createNewUser(body);
    return this.res.status(status).json(message);
  }

  public async getOneUser() {
    try {
      const { body } = this.req;
      const { status, message } = await this.service.getOneUser(body);
      return this.res.status(status).json(message);
    } catch (error) {
      this.res
        .status(StatusHttp.INTERNAL_SERVER_ERROR)
        .json(
          "sorry, looks like there was some internal problem, this is not your fault"
        );
    }
  }
}
