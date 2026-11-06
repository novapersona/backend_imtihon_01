const { Client } = require("pg");
require("dotenv").config();

async function createDatabaseIfNotExists() {
    const client = new Client({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "3218306674524",
        database: "postgres",
    });

    try {
        await client.connect();
        const dbName = process.env.DB_NAME || "ilm_chashmasi";
        const check = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [dbName]);
        if (check.rowCount === 0) {
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database "${dbName}" created successfully!`);
        } else {
            console.log(`Database "${dbName}" already exists.`);
        }
    } catch (err) {
        console.error("Error creating database:", err.message);
    } finally {
        await client.end();
    }
}

if (require.main === module) {
    createDatabaseIfNotExists();
}

module.exports = createDatabaseIfNotExists;
