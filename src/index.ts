import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { MessageRepository } from "./MessageRepository";
import { Readable } from "stream";
import { getChannel, sendMessageToQueue } from "./rabbitMQService";
import { Channel } from "amqplib";
import redisClient from "./redisClient";

const app = express();
let channel: Channel;

getChannel().then((ch) => {
  channel = ch;
});

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/chat",
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
  },
});
const messageRepository = new MessageRepository();
messageRepository.createTable().then(() => {
  console.log("Tabela inicializada");
});

let messages: Array<{ username: string; color: string; message: string }> = [];

messageRepository.getAllMessages().then((data) => {
  messages = data;
});

app.get("/messages", async (req: Request, res: Response) => {
  try {
    const cacheKey = "messages";
    const cachedMessages = await redisClient.get(cacheKey);
    if (cachedMessages) {
      console.log("Cache hit");
      const readStream = Readable.from(cachedMessages);
      readStream.pipe(res);
    } else {
      console.log("cache miss");
      const messagesString = JSON.stringify(messages, null, 2);
      await redisClient.set(cacheKey, messagesString, {
        EX: 60, // Cache expiration time in seconds
      });
      const readStream = Readable.from(messagesString);
      readStream.pipe(res);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on(
    "chat message",
    async (msg: { username: string; color: string; message: string }) => {
      messages.push(msg);

      try {
        await sendMessageToQueue(channel, msg);
      } catch (error) {
        console.error("Error sending message to queue", error);
      }
      messageRepository.createMessage({
        username: msg.username,
        color: msg.color,
        message: msg.message,
      });
      io.emit("chat message", msg);
    }
  );
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
