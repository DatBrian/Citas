import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";
dotenv.config();

class Connection {
  private client: MongoClient;
  private db: Db | undefined;

  constructor() {
    this.client = new MongoClient(this.getUri());
  }

  private getUri(): string {
    return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.qogxj7f.mongodb.net/`;
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db();
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error;
    }
  }

  public getDatabase(): Db {
    if (!this.db) {
      throw new Error("No hay una conexión establecida.");
    }
    return this.db;
  }

}

export default Connection;