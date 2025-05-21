import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const connection = process.env.DB_FILE_NAME!;

const db = drizzle(connection, schema);
