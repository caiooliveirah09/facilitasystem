import { Router } from "express";
import TaskController from "../controllers/Task.controller";
import UserController from "../controllers/User.controller";

const router = Router();
router.get("/", async (req, res, next) => res.status(200).json("ok"));
router.post("/create", async (req, res, next) =>
  new TaskController(req, res, next).createNewTask()
);

router.post("/get", async (req, res, next) =>
  new TaskController(req, res, next).getAllTasks()
);
/*
router.patch("/", async (req, res, next) =>
  new TaskController(req, res, next).updateOneTask()
);

router.delete("/", async (req, res, next) =>
  new TaskController(req, res, next).deleteOneTask()
);
*/

export default router;
