import { Router } from "express";
import TaskController from "../controllers/Task.controller";

const router = Router();
router.get("/", async (req, res, next) => res.status(200).json("ok"));
router.post("/:token", async (req, res, next) =>
  new TaskController(req, res, next).createNewTask()
);

router.get("/:token", async (req, res, next) =>
  new TaskController(req, res, next).getAllTasks()
);

router.delete("/:taskId/:token", async (req, res, next) =>
  new TaskController(req, res, next).deleteOneTask()
);

router.patch("/:taskId/:token", async (req, res, next) =>
  new TaskController(req, res, next).updateOneTask()
);
export default router;
