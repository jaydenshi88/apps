CREATE TABLE `contacts` (
	`id` varchar(191) NOT NULL,
	`phone` int NOT NULL,
	`full_name` text NOT NULL,
	`email` varchar(256) NOT NULL,
	`is_primary` boolean NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`),
	CONSTRAINT `is_primary_idx` UNIQUE(`is_primary`)
);
