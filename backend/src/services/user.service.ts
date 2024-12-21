import type { User_ } from "@/models/user.model";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  async register(userData: User_): Promise<User_> {
    if (await User.findOne({ email: userData.email })) {
      throw new Error("Email already exists...");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword, role: userData.role || "USER" });
    return await user.save();
  }

  async login(userData: {
    email: string;
    password: string;
  }): Promise<{ user: User_; token: string }> {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      throw new Error("User not found...");
    }

    if (!(await bcrypt.compare(userData.password, user.password))) {
      throw new Error("Wrong password!");
    }

    const token = jwt.sign(
      { username: user.name, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Optional: Set token expiration
    );

    return { user, token };
  }
}

export default new UserService();