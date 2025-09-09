const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; 
const client = new MongoClient(url);

const dbName = "resumeData";

async function main() {
  try {
    await client.connect();
    console.log("You are successfully  connected to MongoDB");

    const db = client.db(dbName);
    console.log(` Database selected: ${db.databaseName}`);

    const result = await db.command({ ping: 1 });
    console.log("Ping result:", result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main();
