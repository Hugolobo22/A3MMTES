import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const connection = postgres(process.env.DB_FILE_NAME!);

const db = drizzle(connection, { schema });
