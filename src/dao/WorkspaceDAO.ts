import { mongo } from "../mongo";
import { Collection, ObjectID } from "mongodb";

import { Workspace } from "ykd-base/workspaces";

const collection = () => mongo.db.collection("sugar_workspaces");

export const findOneWorkspace = async function(workspace: Workspace) {
  return await collection().findOne(getQuery(workspace));
};

function getQuery(workspace: Workspace) {
  const id = new ObjectID(workspace.id);

  let query: any = {
    _id: id
  };
  if (workspace.workspaceId) {
    query = [
      {
        workspaceId: workspace.workspaceId
      },
      { accountId: workspace.accountId }
    ];
  }
  return query;
}

export const saveWorkspace = async function(workspace: Workspace) {
  return await collection().updateOne(
    getQuery(workspace),
    {
      $currentDate: {
        gmtModified: true
      },
      $set: { ...workspace },
      $setOnInsert: { gmtCreated: new Date() }
    },
    { upsert: true }
  );
};
