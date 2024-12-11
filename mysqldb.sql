-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project
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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (55,2,13,'2024-12-11 19:34:52'),(59,2,14,'2024-12-11 19:42:09'),(60,3,14,'2024-12-11 19:42:46'),(62,3,13,'2024-12-11 19:48:29'),(65,2,17,'2024-12-11 19:50:42'),(66,3,17,'2024-12-11 19:50:51'),(67,4,13,'2024-12-11 20:22:26'),(81,4,14,'2024-12-11 20:36:56'),(82,4,17,'2024-12-11 20:37:02'),(83,2,19,'2024-12-11 20:37:42');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `likes` int(11) DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `event_time` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `images` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (13,'awfaw','fwqfqw','Category2',2,1,'6152-02-05 15:21:00','2024-12-11 18:39:48','[\"/uploads/1733942388143_images.jpg\"]'),(14,'dsf32asd33','3gewsdg','Category2',3,1,'2031-05-05 00:02:00','2024-12-11 18:39:56','[\"/uploads/1733942396836_465569847_2017162545388460_6249242168220607063_n.jpg\"]'),(17,'hello','susitikimas kaune','Category2',3,4,'2026-06-08 15:00:00','2024-12-11 19:50:03','[\"/uploads/1733946603670_Audemars Piguet 41MM Royal Oak Selfwinding Flying Tourbillon Titanium Green Dial 26534TI.OO.1220TI.01.png\",\"/uploads/1733946603671_Audemars Piguet Code 11.59 Novelty Motif Concentric Circle Green Dial 15210ST.OO.A056KB.01.png\",\"/uploads/1733946603671_Audemars Piguet Royal Oak 33MM Rose Gold White Dial Diamond Bezel 67651OR.ZZ.1261OR.01.png\",\"/uploads/1733946603671_Audemars Piguet Royal Oak 39MM Stainless Steel Jumbo Blue Dial 16202ST.OO.1240ST.02.png\",\"/uploads/1733946603672_Audemars Piguet Royal Oak 39MM Stainless Steel Royal Oak Dual Time White Dial 26120ST.OO.1220ST.01.png\",\"/uploads/1733946603672_Audemars Piguet Royal Oak 41MM Brown Alligator Strap Rose Gold Case Brown Dial 26331OR.OO.D821CR.01.png\",\"/uploads/1733946603673_Audemars Piguet Royal Oak 41MM Chronograph Rose Gold Green Dial New 26240OR.OO.1320OR.08.png\",\"/uploads/1733946603673_Audemars Piguet Royal Oak 41MM Chronograph Rose Gold, Factory Set, White Subdials 26322OR.ZZ.1222OR.01.png\",\"/uploads/1733946603673_Audemars Piguet Royal Oak 41MM Chronograph Selfwinding Steel Black Dial 26240ST.OO.1320ST.06.png\",\"/uploads/1733946603674_Audemars Piguet Royal Oak 41MM Chronograph Stainless Steel Panda Dial 26331ST.OO.1220ST.03.png\",\"/uploads/1733946603674_Audemars Piguet Royal Oak 41MM Frosted Gold Double Balance Wheel Yellow Gold Openworked Dial 15412BA.YG.1224BA.01.png\",\"/uploads/1733946603674_Audemars Piguet Royal Oak 41MM Perpetual Calendar Black Ceramic Slate Grey Dial 26579CE.OO.1225CE.01.png\"]'),(19,'123','123','Category2',1,4,'1241-12-04 21:24:00','2024-12-11 20:37:32','[\"/uploads/1733949452708_Audemars Piguet Royal Oak 41MM Chronograph Selfwinding Steel Black Dial 26240ST.OO.1320ST.06.png\"]');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','test@example.com','password','user','2024-12-11 17:48:30'),(2,'antras','antras@gmail.com','antras','admin','2024-12-11 18:57:46'),(3,'treciassss','trecias@gmail.com','trecias','admin','2024-12-11 18:59:55'),(4,'ketvirtas','ketvirtas@gmail.com','ketvirtas','user','2024-12-11 19:48:45');
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

-- Dump completed on 2024-12-11 22:38:40
