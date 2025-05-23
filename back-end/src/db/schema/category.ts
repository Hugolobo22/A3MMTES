import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { task, user } from ".";

export const category = pgTable("Categorias", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  userId: text("customer_id").references(() => user.id, {
    onDelete: "cascade",
  }),
});

export const categorias_Tarefas_Relationship = relations(
  category,
  ({ one, many }) => ({
    returns: one(user, {
      fields: [category.userId],
      references: [user.id],
      relationName: "tarefas_Personalizada",
    }),
    task: many(task),
  })
);
