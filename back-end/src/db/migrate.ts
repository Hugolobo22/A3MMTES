import chalk from "chalk";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const connection = process.env.DB_FILE_NAME!
const db = drizzle(connection)

await migrate(db, { migrationsFolder: 'drizzle' })

console.log(chalk.greenBright("Migrations aplicadas com sucesso"))

await connection.end()

process.exit()