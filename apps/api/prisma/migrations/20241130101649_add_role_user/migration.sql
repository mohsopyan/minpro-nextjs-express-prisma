-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ATTENDEE', 'ORGANIZER') NOT NULL DEFAULT 'ATTENDEE';
