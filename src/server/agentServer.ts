import { Task, Agent, AgentStatus } from "ykd-base/compile";

import { findWaitAgent, update as updateAgent } from "../dao/AgentDAO";
import { update as updateTask } from "../dao/TaskDAO";
const socketCache: any = {};

export async function sendAgent(task: Task) {
  const agent = await findWaitAgent();

  const socket = socketCache[agent.sid];
  if (socket) {
    socket.emit("task", task);
  } else {
    console.log("agent 不存在", agent);
    updateAgent({ ...agent, status: AgentStatus.offline });
    // 重试
    sendAgent(task);
  }
}

export function initAgent(io: SocketIO.Server) {
  io.of("/agent").on("connection", function(socket: SocketIO.Socket) {
    socketCache[socket.id] = socket;

    socket.emit("onRegister", true);

    let agent: Agent;

    socket.on("register", function(msg: Agent) {
      //注册 agent
      agent = msg;
      updateAgent(msg);
    });
    socket.on("task", function(msg: Task) {
      //注册 agent
      updateTask(msg);
    });
    socket.on("disconnect", function() {
      delete socketCache[socket.id];

      updateAgent({
        ...agent,
        status: AgentStatus.offline
      });
    });
  });
}
