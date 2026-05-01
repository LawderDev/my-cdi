CREATE TABLE `frequentation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`starts_at` text NOT NULL,
	`activity` text NOT NULL,
	`student_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_freq_student` ON `frequentation` (`student_id`);--> statement-breakpoint
CREATE INDEX `idx_freq_starts_at` ON `frequentation` (`starts_at`);