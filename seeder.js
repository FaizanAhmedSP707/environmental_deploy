const { MongoClient } = require("mongodb");
require("dotenv").config();
const loading = require("loading-cli");
const { MONGODB_URI, MONGODB_PRODUCTION_URI } = process.env;


/**
 * Some constants
 */
const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB_PRODUCTION_URI : MONGODB_URI
);

async function main_handle() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("country").find({}).count();

    /**
     * If there are existing records then delete the current collections
     */
    if (results) {
        db.collection("country").drop();
    }

    const loader = loading("importing your records!!").start();


    loader.stop();
    console.info(
      `country collection set up!`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main_handle();