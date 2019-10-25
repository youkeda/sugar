import { MongoClient, Db } from "mongodb";

// Connect to MongoDB

class Mongo {
  db: Db;

  url: string;

  async connect(url?: string) {
    if (url) {
      this.url = url;
    }
    const client = new MongoClient(this.url, { useUnifiedTopology: true });

    await client.connect();
    this.db = client.db();
    return this.db;
  }
}

export const mongo = new Mongo();
