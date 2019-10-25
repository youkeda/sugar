import { mongo } from "../mongo";
import { Collection, ObjectID } from "mongodb";

import { Workspace } from "ykd-base/workspaces";

const collection = () => mongo.db.collection("sugar_workspaces");

export const save = async function(workspace: Workspace) {
  return await collection().findOneAndUpdate(
    { _id: new ObjectID(workspace.id) },
    {
      $set: { ...workspace, updatedAt: new Date() }
    },
    { upsert: true }
  );
};
