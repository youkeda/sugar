import { Task, Agent, AgentStatus } from "../types/compile";

import {
  findWaitAgent,
  update as updateAgent,
  delAgent
} from "../dao/AgentDAO";
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

    socket.on("register", function(msg: Agent) {
      //注册 agent
      updateAgent(msg);
    });

    socket.on("remove", function(sid: string) {
      delAgent(sid);
    });

    socket.on("task", function(msg: Task) {
      //agent 任务执行
      updateTask(msg);
    });
    socket.on("disconnect", function() {
      console.log(socket.id, "disconnected");
      delete socketCache[socket.id];
      delAgent(socket.id);
    });
  });
}
