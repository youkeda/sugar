import { mongo } from "../mongo";
import { Collection, ObjectID } from "mongodb";

import {Task} from "ykd-base/compile";

export const collection = function(): Collection {
  return mongo.db.collection("sugar_tasks");
};

export const update = function(task: Task) {
  delete task.createdAt;
  collection().findOneAndUpdate(
    { _id: new ObjectID(task._id) },
    {
      $set: { status: task.status, updatedAt: new Date() }
    },
    { upsert: true },
    function(err, r) {}
  );
};
