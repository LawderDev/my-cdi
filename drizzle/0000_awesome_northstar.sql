CREATE TABLE `students` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nom` text NOT NULL,
	`prenom` text NOT NULL,
	`classe` text NOT NULL,
	`ine` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_students_nom` ON `students` (`nom`,`prenom`);--> statement-breakpoint
CREATE INDEX `idx_students_classe` ON `students` (`classe`);