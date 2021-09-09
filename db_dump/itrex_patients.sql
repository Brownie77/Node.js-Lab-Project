-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: itrex
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES ('0303303d-cc2b-466e-961b-76caca9fc370','dasad','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:53:08','2021-09-09 12:53:08'),('06b2d207-f4d8-4f0d-9620-746ab1845f51','aaaaa','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:01:29','2021-09-09 13:01:29'),('0a1dcc1d-44f6-4269-8051-6843749f8c8b','red','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:03:06','2021-09-09 13:03:06'),('131a2117-d1ba-4deb-9529-368f6f830b1f','red','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:02:27','2021-09-09 12:02:27'),('1c84324f-4e40-4c93-aa7f-ce08b33e0bcb','dsasasd','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:46:51','2021-09-09 12:46:51'),('1f27c0f0-fd4e-47f1-b319-ac9dc66d5969','11111','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:30:40','2021-09-08 21:30:40'),('2c9f32a8-3757-4e85-9bdf-1eca5389a354','bbbbbbbbbbb','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:01:34','2021-09-09 13:01:34'),('335dd083-4d07-4a4d-a642-c43783547418','ccccccccccccc','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:01:35','2021-09-09 13:01:35'),('3c0799ff-91aa-426e-96da-3d2959aadf83','vvvvvvvv','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:01:32','2021-09-09 13:01:32'),('5977ba2c-4254-4784-a254-3f3e8c8193a9','saddsas','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:26:31','2021-09-08 21:26:31'),('5e60b107-b952-4233-b3f9-fd726892093f','asdsadsad','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:30:33','2021-09-08 21:30:33'),('60e45690-d489-41e2-a00f-e09f5eb16262','saas','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:27:20','2021-09-08 21:27:20'),('662c1bb0-6b9c-406a-aab8-2ddd85bfdc83','sam','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:06:20','2021-09-09 13:06:20'),('67e4816e-a84c-4767-8b44-782a255f8d85','vvvv','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:02:53','2021-09-09 13:02:53'),('6c9c0072-2e92-470c-8e80-ff2fe16f9505','aaaaaaaaaa','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:00:08','2021-09-09 13:00:08'),('74a672ba-adcd-4ccd-b35a-ecf1d65b2900','aaa','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:45:58','2021-09-09 12:45:58'),('7b796bb0-7cd6-462c-abce-8de071731c6a','ads','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:50:38','2021-09-09 12:50:38'),('7da9b7d5-f8d1-4c7e-82cd-703faac2fb55','dasdasas','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:49:45','2021-09-09 12:49:45'),('7f379edc-401f-4853-9103-a3f466706ee1','asdas','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:24:32','2021-09-08 21:24:32'),('8c4a0bc5-e7a7-415f-92e7-824668c512a8','blue','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:03:09','2021-09-09 13:03:09'),('92931618-ccde-4abf-9d05-5acd79ca93b3','a1d','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:02:22','2021-09-09 12:02:22'),('987267e3-ac9b-4ae2-9f0a-2af7e7089a94','aaa','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:46:48','2021-09-09 12:46:48'),('9fc36bee-8077-40e7-bf6f-a4e794d4fa9e','ads','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:23:53','2021-09-08 21:23:53'),('a82e69b0-ff67-4e92-be73-cdb3581825ee','dddd','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:02:56','2021-09-09 13:02:56'),('ad27deb3-be58-43a8-a4dc-eae504c42c7f','dassd','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:16:55','2021-09-08 21:16:55'),('b592ec82-42a7-49f1-8e9f-7a7c62b9b6bc','nnnnnnnnnn','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:02:06','2021-09-09 13:02:06'),('bd45b06b-c223-48d6-9b88-2aac222d3ea6','ccccccccccc','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:02:04','2021-09-09 13:02:04'),('c093b3ad-4cc3-474c-94b0-75ec10ae41b4','dsasad','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 12:58:08','2021-09-09 12:58:08'),('c1154795-3d19-4a07-a6ba-6ec46b2653b0','aaaa','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:02:51','2021-09-09 13:02:51'),('c407a8ec-cfcd-47b9-ab02-0dd233fb185e','bbbbbbbbbb','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:02:05','2021-09-09 13:02:05'),('e13c8fb0-b54d-424f-a301-59d8b5588423','sadas','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:22:32','2021-09-08 21:22:32'),('e4a166bf-5bcf-4e29-8947-ef4a81f37296','green','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-09 13:03:12','2021-09-09 13:03:12'),('f71b6267-63bf-41b9-b127-47537b9f2f07','asasdsad','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:27:45','2021-09-08 21:27:45'),('fa469e23-8be5-4052-891d-0b7ec25704cc','aaa','ab3bb1fd-ed5b-4f51-bd48-274ec46a53cc','2021-09-08 21:29:19','2021-09-08 21:29:19');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-09 16:10:02
