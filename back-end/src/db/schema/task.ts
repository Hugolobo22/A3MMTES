import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

import { boolean, date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { category, user } from ".";


export const prioirtyEnum = pgEnum('prioirty', ['alta prioridade', 'média prioridade', 'baixa prioridade']);


export const task = pgTable("Task", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  prioirty: prioirtyEnum("prioirty").default("baixa prioridade").notNull(),
  dateStart: timestamp("dateStart").notNull().defaultNow(),
  deadline: timestamp("deadline").notNull(),
  done: boolean("done").default(false).notNull(),
  category: text("category").references(() => category.id, {
    onDelete: "cascade",
  }),
  userId: text("customer_id").references(() => user.id, {
    onDelete: "cascade",
  }),
});

export const task_Relationship = relations(task, ({ one }) => ({
  returns: one(user, {
    fields: [task.userId],
    references: [user.id],
    relationName: "task_Do_Usuario",
  }),
  category: one(category, {
    fields: [task.category],
    references: [category.id],
    relationName: "task_Categorias",
  }),
}));
