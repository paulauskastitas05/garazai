-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: garage_rental
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `garages`
--

DROP TABLE IF EXISTS `garages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tools` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `ownerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garages`
--

LOCK TABLES `garages` WRITE;
/*!40000 ALTER TABLE `garages` DISABLE KEYS */;
INSERT INTO `garages` VALUES (27,'Linas Auto','Liepų g 85a.','[\"/uploads/1731522279201_car-up-on-hydraulic-lift-at-a-garage-mechanic-working-underneath-vehicle-AN7MTE.png\",\"/uploads/1731522279201_two-car-mechanics-in-a-workshop-repairing-car-together-ZEF10725.png\",\"/uploads/1731522279202_car-repair-maintenance-service-car-raised-on-car-lift-in-autoservice-garage-RFP0KW.png\",\"/uploads/1731522279202_cars-in-a-garage-shallow-dof-color-toned-image-KR3F0Y.png\"]','2024-11-13 18:24:39','2024-11-13 18:24:39','[\"Kompresorius\",\"Automobilio keltuvas\",\"Tepalų siurblys\",\"Ratų suvedimo stendas\"]','Klaipėda',10),(28,'Staskos Garažai','Elektros g. 6','[\"/uploads/1731522421965_20170527_134020.png\",\"/uploads/1731522421966_Modern-Four-car-garage-interior-perspective.png\",\"/uploads/1731522421966_istockphoto-1391875986-612x612.png\",\"/uploads/1731522421967_automobile-repair-shop-or-car-repair-garage-interior-with-cars-on-the-lifts-3d-illustration-2J166KB.png\"]','2024-11-13 18:27:01','2024-11-13 18:27:01','[\"Raktų komplektas\",\"Įpurškimo sistema testeris\",\"Ratų suvedimo stendas\",\"Domkratas\"]','Panevėžys',11),(29,'Lorenso garažas','Pirties g. 9','[\"/uploads/1731522483518_Modern-Four-car-garage-interior-perspective.png\",\"/uploads/1731522483518_istockphoto-1391875986-612x612.png\",\"/uploads/1731522483519_automobile-repair-shop-or-car-repair-garage-interior-with-cars-on-the-lifts-3d-illustration-2J166KB.png\",\"/uploads/1731522483519_the-car-garage-arrange-some-practical-advice-facility-0-531.png\"]','2024-11-13 18:28:03','2024-11-13 18:28:03','[\"Veržliaraktis\",\"Variklio laikiklis\",\"Įpurškimo sistema testeris\",\"Kompresorius\"]','Rokiškis',12),(30,'Eugenijaus Garažas','Algirdo g. 27','[\"/uploads/1731522567511_garage-interior-modern (1).png\",\"/uploads/1731522567512_INTERIOR_1_1.png\",\"/uploads/1731522567512_65a9c9082b33e4e931a7f5d3b949651c.png\",\"/uploads/1731522567512_car-garage-auto-lift.png\"]','2024-11-13 18:29:27','2024-11-13 18:29:27','[\"Replės\",\"Automobilio keltuvas\",\"Įpurškimo sistema testeris\",\"Padangų montavimo staklės\"]','Kaunas',13);
/*!40000 ALTER TABLE `garages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `renter_requests`
--

DROP TABLE IF EXISTS `renter_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `renter_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `renter_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `renter_requests`
--

LOCK TABLES `renter_requests` WRITE;
/*!40000 ALTER TABLE `renter_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `renter_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user','renter') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'','adminas@gmail.com','123123','$2a$10$hBSH4C04UyyNecXAckwg7ODzro3xDEv1Jg12cXp4NiZqahs3JAgem',NULL,'2024-10-02 09:05:00'),(2,'paprastas','paprastas@gmail.com',NULL,'$2a$10$XwMmnyEiyVByc5sYX8CgCu8kzeHZY8V37D2t1IC.e/Gk7lVU2s58S','user','2024-10-02 09:05:26'),(3,'nuomotojas','nuomotojas@gmail.com',NULL,'$2a$10$ZyIVWIJu1TVPqO0c1z4RfOIJIduBq5bGexOPfrg7/7kCLjgu2y7MC','renter','2024-10-02 09:05:36'),(7,'ciuvas','ciuvas@gmail.com','37064750850','ciuvas','admin','2024-11-13 16:54:21'),(10,'vartotojas1@gmail.com','vartotojas1@gmail.com','1234567890','vartotojas1','renter','2024-11-13 18:18:58'),(11,'vartotojas2','vartotojas2@gmail.com','4157392148','vartotojas2','renter','2024-11-13 18:19:14'),(12,'vartotojas3','vartotojas3@gmail.com','6287143267','vartotojas3','renter','2024-11-13 18:19:32'),(13,'vartotojas4','vartotojas4@gmail.com','7735824195','vartotojas4','renter','2024-11-13 18:19:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-13 20:51:28
