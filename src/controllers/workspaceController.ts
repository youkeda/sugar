//import { Agent } from "../models/Agent";
import { Request, Response, Express } from "express";


/**
 * GET /login
 * Login page.
 */
export const init = async (req: Request, res: Response) => {
  const workspace = req.body;



  res.json({});
};

export default (app: Express) => {
  app.post("/workspaces/init", init);
};
