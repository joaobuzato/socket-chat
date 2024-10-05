import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { Readable } from "stream";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/chat",
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
  },
});

let messages: Array<string> = [];

// Load messages from JSON file at startup
fs.readFile("messages.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Failed to load messages from file:", err);
  } else {
    messages = JSON.parse(data);
  }
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
    messages.push(msg);
    fs.writeFile("messages.json", JSON.stringify(messages), (err) => {
      if (err) {
        console.error("Failed to save message:", err);
      }
    });
    io.emit("chat message", msg);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
