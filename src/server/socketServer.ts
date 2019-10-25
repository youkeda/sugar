import SocketIO from "socket.io";

import { Server } from "http";
import { initAgent } from "./agentServer";
import { initBrowser } from "./browserServer";

export function init(server: Server) {
  setTimeout(() => {
    const io = SocketIO(server);
    initAgent(io);
    initBrowser(io);
  }, 2000);
}
