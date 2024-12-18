import AuthController from "@/controllers/auth.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;