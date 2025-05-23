CREATE TYPE "public"."prioirty" AS ENUM('alta prioridade', 'média prioridade', 'baixa prioridade');--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Categorias" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"customer_id" text
);
--> statement-breakpoint
CREATE TABLE "Task" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"prioirty" "prioirty" DEFAULT 'baixa prioridade' NOT NULL,
	"dateStart" timestamp DEFAULT now() NOT NULL,
	"deadline" timestamp NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"customer_id" text
);
--> statement-breakpoint
ALTER TABLE "Categorias" ADD CONSTRAINT "Categorias_customer_id_User_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Task" ADD CONSTRAINT "Task_customer_id_User_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;