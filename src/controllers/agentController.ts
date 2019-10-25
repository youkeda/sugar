//import { Agent } from "../models/Agent";
import { Request, Response } from "express";

import {save} from "../dao/WorkspaceDAO";

/**
 * GET /login
 * Login page.
 */
export const register = async (req: Request, res: Response) => {

  const workspace = req.body;

  const result = await save(workspace);

  console.log(workspace);
  res.json(result);
};


