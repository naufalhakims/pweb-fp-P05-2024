import UserService from "@/services/user.service";
import { Request, Response } from "express";
import formatResponse from "@/utils/formatResponse";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const userData = { ...req.body, name: req.body.username };
      delete userData.username;
      const auth = await UserService.register(userData);

      if (!auth) {
        throw new Error("User registration failed...");
      }

      const { __v, _id, password, ...userWithoutPassword } = auth.toObject();
      res.status(201).json(formatResponse(
        "success", "User registered successfully", userWithoutPassword
      ));
    } 
    catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Email already exists...")) {
          res.status(409).json(formatResponse("failed", error.message, null));
        }
        else {
          res.status(500).json(formatResponse("error", error.message, null));
        }
      } 
      else {
        res.status(500).json(formatResponse("error", "An unknown error occurred.", null));
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new Error("Username and password are required...");
      }

      const { user, token } = await UserService.login({ username, password });
      const user_ = { username: user.name, email: user.email };

      res.status(200).json(formatResponse(
        "success", "User logged in successfully", { user_, token }
      ));
    }
    catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("User not found...") || error.message.includes("Wrong password!")) {
          res.status(401).json(formatResponse("failed", error.message, null));
        } else {
          res.status(500).json(formatResponse("error", error.message, null));
        }
      } else {
        res.status(500).json(formatResponse("error", "An unknown error occurred.", null));
      }
    }
  }
}

export default new UserController();