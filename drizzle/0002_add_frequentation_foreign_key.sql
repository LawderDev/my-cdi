PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_frequentation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`starts_at` text NOT NULL,
	`activity` text NOT NULL,
	`student_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_frequentation`("id", "starts_at", "activity", "student_id", "created_at", "updated_at") SELECT "id", "starts_at", "activity", "student_id", "created_at", "updated_at" FROM `frequentation`;--> statement-breakpoint
DROP TABLE `frequentation`;--> statement-breakpoint
ALTER TABLE `__new_frequentation` RENAME TO `frequentation`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `idx_freq_student` ON `frequentation` (`student_id`);--> statement-breakpoint
CREATE INDEX `idx_freq_starts_at` ON `frequentation` (`starts_at`);