// src/index.ts
import express, { Express, Request, Response } from "express";
import connDB from "@/db-conn";
import cors from "cors";
import userRoutes from "@/router/user.router";
import formatResponse from "@/utils/formatResponse";
import feedbackRoutes from '@/router/feedback.router';
import crowdfundRoutes from '@/router/crowdfund.router';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// mongodb atlas connection
connDB();

app.get("/", (req: Request, res: Response) => {
  const date = new Date().toLocaleString();
  const response = formatResponse("success", "Hello World", date);
  res.send(response);
});

// routers
app.use('/', crowdfundRoutes);
app.use('/user', userRoutes);
app.use('/feedback', feedbackRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});