import UserODM from "../database/models/userODM";
import IController from "../interfaces/IController";
import IUser, { IUserWithToken } from "../interfaces/IUser";
import StatusHttp from "../interfaces/StatusHttps";
import { sign } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

export default class UserService {
  private model: UserODM;

  constructor() {
    this.model = new UserODM();
  }

  public async createNewUser(
    user: IUser
  ): Promise<IController<Partial<IUser> | string>> {
    try {
      const { email, password } = user;
      const newUser = await this.model.createNewUser({ email, password });
      return {
        status: StatusHttp.CREATED,
        message: newUser,
      };
    } catch (error) {
      return {
        status: StatusHttp.INTERNAL_SERVER_ERROR,
        message:
          "sorry, looks like there was some internal problem, this is not your fault",
      };
    }
  }

  public async getOneUser({
    email,
    password,
  }: IUser): Promise<IController<IUserWithToken>> {
    const user = await this.model.getOneUser({ email, password });
    const token = sign(user, JWT_SECRET, { expiresIn: "3d" });
    return {
      status: StatusHttp.OK,
      message: { token, email: email, tasks: user.tasks },
    };
  }
}
