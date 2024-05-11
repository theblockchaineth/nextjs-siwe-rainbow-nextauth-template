CREATE TABLE IF NOT EXISTS "templateuser" (
	"pid" serial PRIMARY KEY NOT NULL,
	"wallet" varchar(64) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "templateuser_wallet_idx" ON "templateuser" ("wallet");