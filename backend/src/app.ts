import express from "express";
import usersRoutes from "./routes/Users.route";
import tasksRoutes from "./routes/Tasks.route";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    const corsOptions = {
      credentials: true,
      origin: function (_origin: any, callback: any) {
        callback(null, true);
      },
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/users", usersRoutes);
    this.app.use("/tasks", tasksRoutes);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }

  public start(PORT: number): void {
    this.app.listen(PORT, () =>
      console.log(`Server is running on PORT: ${PORT}`)
    );
  }
}

export { App };

export const { app } = new App();
