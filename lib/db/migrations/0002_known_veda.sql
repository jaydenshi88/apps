CREATE TABLE `partners` (
	`id` varchar(191) NOT NULL,
	`name` varchar(256) NOT NULL,
	`is_verified` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `partners_id` PRIMARY KEY(`id`),
	CONSTRAINT `is_verified_idx` UNIQUE(`is_verified`)
);
