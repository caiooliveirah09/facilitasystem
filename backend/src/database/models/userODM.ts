import { Model, Schema, model, models } from "mongoose";
import ITask from "../../interfaces/ITask";
import IUser from "../../interfaces/IUser";

export default class UserODM {
  private schema: Schema;
  private model: Model<IUser>;

  constructor() {
    this.schema = new Schema<IUser>({
      id: { type: String, required: false },
      email: { type: String, required: false, unique: true, index: true },
      password: { type: String, required: false },
      tasks: [
        {
          title: { type: String, required: false },
          description: { type: String, required: false },
        },
      ],
    });
    this.model = models.users || model<IUser>("users", this.schema);
  }

  public async createNewUser(user: IUser): Promise<Partial<IUser>> {
    const { email, password } = user;
    const newUser = await this.model.create({
      email,
      password,
    });
    const { _id } = newUser;
    return {
      id: _id.toHexString(),
      email: newUser.email,
    };
  }

  public async getOneUser({
    email,
    password,
  }: IUser): Promise<Partial<IUser> | string> {
    const user = await this.model.findOne({
      email: email,
      password: password,
    });

    if (user) {
      return {
        email: user.email,
        tasks: user.tasks,
      };
    }
    return "user not found";
  }
}
