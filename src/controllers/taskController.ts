//import { Agent } from "../models/Agent";
import { Request, Response } from "express";

import { Task, TaskStatus } from "ykd-base/compile";
import { collection } from "../dao/TaskDAO";

import { sendAgent } from "../server/agentServer";

/**
 * GET /login
 * Login page.
 */
export const create = async (req: Request, res: Response) => {
  const task: Task = req.body;
  task.status = TaskStatus.created;
  task.createdAt = new Date();
  task.updatedAt = new Date();

  await collection().insertOne(task);
  await sendAgent(task);

  res.json({
    isSuccess: true,
    data: task
  });
};
