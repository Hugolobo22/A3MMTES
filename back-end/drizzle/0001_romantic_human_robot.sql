ALTER TABLE "User" ADD COLUMN "senha" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Task" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "Task" ADD CONSTRAINT "Task_category_Categorias_id_fk" FOREIGN KEY ("category") REFERENCES "public"."Categorias"("id") ON DELETE cascade ON UPDATE no action;