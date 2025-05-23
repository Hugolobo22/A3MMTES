import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { category, task } from ".";

export const user = pgTable("User", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  senha: text().notNull(),
});

export const userRelationship = relations(user, ({ many }) => ({
  category: many(category),
  task: many(task),
}));
