--
-- Database: ring
--
--

LOCK TABLES `role` WRITE;
INSERT INTO `role` (`id`, `name`, `gka`) VALUES (1, 'Super Admin', 'super_admin');
INSERT INTO `role` (`id`, `name`, `gka`) VALUES (2, 'Partner Manager', 'partner_manager');
INSERT INTO `role` (`id`, `name`, `gka`) VALUES (3, 'Content Manager', 'content_manager');
UNLOCK TABLES;


LOCK TABLES `type` WRITE;
INSERT INTO `type` (`id`, `name`, `gka`) VALUES (1, 'Admin', 'admin');
INSERT INTO `type` (`id`, `name`, `gka`) VALUES (2, 'Partner', 'partner');
UNLOCK TABLES;
