//import { Agent } from "../models/Agent";
import { Request, Response } from "express";

import { mongo } from "../mongo";

/**
 * GET /login
 * Login page.
 */
export const register = async (req: Request, res: Response) => {
  const collection = mongo.db.collection("sugar_agents");

  const result = await collection.find({}).toArray();

  console.log(result);
  res.json(result);
};


