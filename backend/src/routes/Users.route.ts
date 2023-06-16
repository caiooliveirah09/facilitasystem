import { Router } from "express";
import UserController from "../controllers/User.controller";

const router = Router();

router.post("/", async (req, res, next) =>
  new UserController(req, res, next).createNewUser()
);

router.get("/", async (req, res, next) =>
  new UserController(req, res, next).getOneUser()
);

export default router;
