import express from "express";
import usersRoutes from "./routes/Users.route";
// import tasksRoutes from "./routes/Tasks.route";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/users", usersRoutes);
    // this.app.use("/tasks", tasksRoutes);
  }

  public start(PORT: number): void {
    this.app.listen(PORT, () =>
      console.log(`Server is running on PORT: ${PORT}`)
    );
  }
}

export { App };

export const { app } = new App();
