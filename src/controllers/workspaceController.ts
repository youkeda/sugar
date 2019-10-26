//import { Agent } from "../models/Agent";
import { Request, Response, Express } from "express";

import { findOneWorkspace, saveWorkspace } from "../dao/WorkspaceDAO";

/**
 * GET /login
 * Login page.
 */
export const init = async (req: Request, res: Response) => {
  const workspace = req.body;

  let result = await findOneWorkspace(workspace);

  if (!result) {
    await saveWorkspace(workspace);
    result = await findOneWorkspace(workspace);
  }

  res.json(result);
};

export default (app: Express) => {
  app.post("/workspaces/init", init);
};
