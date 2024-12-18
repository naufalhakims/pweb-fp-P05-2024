import UserController from "@/controllers/user.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;