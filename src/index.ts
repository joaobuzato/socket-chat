// 3. Crie um servidor Express.js.
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { Readable } from "stream";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/chat",
});

app.get("/texts", (req: Request, res: Response) => {
  const stream = new Readable({
    read() {
      for (let i = 0; i < 1000; i++) {
        this.push(`This is line ${i}\n`);
        this.push("COM STREAM");
      }
      this.push("COM STREAM");
      this.push(null);
    },
  });
  stream.pipe(res);
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
