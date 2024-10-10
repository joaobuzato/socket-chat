import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Interface do usuário (opcional)
interface Message {
  id?: number;
  message: string;
  username: string;
  color: string;
}

export class MessageRepository {
  private readonly dbPromise;

  constructor() {
    // Abre uma conexão com o banco de dados SQLite
    this.dbPromise = open({
      filename: "./data/database.sqlite",
      driver: sqlite3.Database,
    });
  }

  async createTable() {
    const db = await this.dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT NOT NULL,
        username TEXT NOT NULL,
        color TEXT NOT NULL DEFAULT '#000000'
      )
    `);
  }

  async createMessage(message: Message): Promise<void> {
    const db = await this.dbPromise;
    await db.run(
      "INSERT INTO messages (message, username, color) VALUES (?, ?, ?)",
      [message.message, message.username, message.color]
    );
  }

  async getAllMessages(): Promise<Message[]> {
    const db = await this.dbPromise;
    const messages = await db.all<Message[]>("SELECT * FROM messages");
    return messages;
  }

  async getMessageById(id: number): Promise<Message | undefined> {
    const db = await this.dbPromise;
    const user = await db.get<Message>("SELECT * FROM messages WHERE id = ?", [
      id,
    ]);
    return user;
  }
}
