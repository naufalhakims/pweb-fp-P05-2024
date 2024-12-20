import formatResponse from "@/utils/formatResponse";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayloadExtended extends jwt.JwtPayload {
    id: string;
}

export interface CustomRequest extends Request {
    user?: JwtPayloadExtended;
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Access denied. No token provided...");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadExtended;
        if (!decoded || !decoded.id) {
            throw new Error("Invalid token...");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json(formatResponse("failed", error.message, null));
            return;
        }
        res.status(500).json(formatResponse("error", "An unknown error occurred.", null));
    }
};