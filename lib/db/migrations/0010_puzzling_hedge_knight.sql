ALTER TABLE `contacts` MODIFY COLUMN `image` text NOT NULL DEFAULT ('/placeholder.png');--> statement-breakpoint
ALTER TABLE `contacts` MODIFY COLUMN `notes` text NOT NULL DEFAULT ('');