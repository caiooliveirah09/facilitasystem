import UserODM from "../database/models/userODM";
import IController from "../interfaces/IController";
import IUser from "../interfaces/IUser";
import StatusHttp from "../interfaces/StatusHttps";

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
  }: IUser): Promise<IController<Partial<IUser> | string>> {
    try {
      const user = await this.model.getOneUser({ email, password });
      return {
        status: StatusHttp.OK,
        message: user,
      };
    } catch (error) {
      return {
        status: StatusHttp.INTERNAL_SERVER_ERROR,
        message:
          "sorry, looks like there was some internal problem, this is not your fault",
      };
    }
  }
}
