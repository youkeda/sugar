import { mongo } from "../mongo";

import {Agent,AgentStatus} from "ykd-base/compile";


export const collection = function() {
  return mongo.db.collection("sugar_agents");
};

export const findWaitAgent = async () => {
  const result = await collection()
    .aggregate([
      { $match: { status: AgentStatus.waiting } },
      { $sample: { size: 1 } }
    ])
    .toArray();
  if (!result) {
    return null;
  }

  return result[0];
};

export const update = function(agent: Agent) {
  collection().findOneAndUpdate(
    { mac: agent.mac },
    {
      $set: { ...agent, updatedAt: new Date() },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true },
    function(err, r) {
      //console.log(r);
    }
  );
};
