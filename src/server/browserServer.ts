import { collection } from "../dao/TaskDAO";

import { Task, TaskStatus, Message } from "../types/compile";

import { sendAgent } from "./agentServer";

const browserCache: any = {};
export function initBrowser(io: SocketIO.Server) {
  io.of("/browser").on("connection", function(socket: SocketIO.Socket) {
    browserCache[socket.id] = socket;
    socket.on("message", function(msg: Message) {
      // 把日志消息发送给房间，前端会监听该房间的消息
      socket.to(msg.taskId).emit("run_app_log", msg);
    });

    //离开房间
    socket.on("run_app_completed", function(taskId: string) {
      socket.leave(taskId);
    });

    socket.on("reConnect", function(taskId: string) {
      socket.join(taskId);
    });

    socket.on("run_app", function(task: Task) {
      // 给这个任务创建一个 room 并发送信息

      task.status = TaskStatus.created;
      task.createdAt = new Date();
      task.updatedAt = new Date();

      collection()
        .insertOne(task)
        .then(() => {
          socket.join(task._id);
          sendAgent(task).then(() => {});
        });
    });

    socket.on("disconnect", function() {
      delete browserCache[socket.id];
    });
  });
}
