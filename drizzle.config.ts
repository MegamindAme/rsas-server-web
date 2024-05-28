// drizzle.config.ts
import type { Config } from 'drizzle-kit';

const config: Config = {
    dialect: "sqlite",
    schema: './src/lib/database/schema.ts',   // Path to your Drizzle schema file
    out: './drizzle',              // Directory for generated migrations
    dbCredentials: {                // Database connection details
        url: './data/sqlite.db'           // Path to your SQLite database file
    },
    // Optional configurations for additional control
    verbose: true,              // Enable verbose logging (recommended for development)
    strict: true               // Enforce strict mode for schema changes
};

export default config;