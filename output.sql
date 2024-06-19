-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: klaviyoapp-safetyinfo8-386a.a.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_klaviyoapikey`
--

DROP TABLE IF EXISTS `api_klaviyoapikey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_klaviyoapikey` (
  `id` char(32) NOT NULL,
  `email` varchar(254) NOT NULL,
  `api_key` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_klaviyoapikey`
--

LOCK TABLES `api_klaviyoapikey` WRITE;
/*!40000 ALTER TABLE `api_klaviyoapikey` DISABLE KEYS */;
INSERT INTO `api_klaviyoapikey` VALUES
('78614e5a8690478d83a18c76c3ac7ada','safe@gmail.com','klaviyo_key');
/*!40000 ALTER TABLE `api_klaviyoapikey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES
(1,'Can add log entry',1,'add_logentry'),
(2,'Can change log entry',1,'change_logentry'),
(3,'Can delete log entry',1,'delete_logentry'),
(4,'Can view log entry',1,'view_logentry'),
(5,'Can add permission',2,'add_permission'),
(6,'Can change permission',2,'change_permission'),
(7,'Can delete permission',2,'delete_permission'),
(8,'Can view permission',2,'view_permission'),
(9,'Can add group',3,'add_group'),
(10,'Can change group',3,'change_group'),
(11,'Can delete group',3,'delete_group'),
(12,'Can view group',3,'view_group'),
(13,'Can add user',4,'add_user'),
(14,'Can change user',4,'change_user'),
(15,'Can delete user',4,'delete_user'),
(16,'Can view user',4,'view_user'),
(17,'Can add content type',5,'add_contenttype'),
(18,'Can change content type',5,'change_contenttype'),
(19,'Can delete content type',5,'delete_contenttype'),
(20,'Can view content type',5,'view_contenttype'),
(21,'Can add session',6,'add_session'),
(22,'Can change session',6,'change_session'),
(23,'Can delete session',6,'delete_session'),
(24,'Can view session',6,'view_session'),
(25,'Can add user',7,'add_user'),
(26,'Can change user',7,'change_user'),
(27,'Can delete user',7,'delete_user'),
(28,'Can view user',7,'view_user'),
(29,'Can add klaviyo api key',8,'add_klaviyoapikey'),
(30,'Can change klaviyo api key',8,'change_klaviyoapikey'),
(31,'Can delete klaviyo api key',8,'delete_klaviyoapikey'),
(32,'Can view klaviyo api key',8,'view_klaviyoapikey');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES
(1,'pbkdf2_sha256$720000$K0iKV0HLb5FA3BZ0lEqFC1$gaz7+wVtXqbYBon2GppaXyjReFKs4UtNVAKkg1kr0xA=','2024-03-03 12:31:20.738014',0,'safe@gmail.com','','','',0,1,'2024-02-04 22:06:30.416382');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES
(1,'admin','logentry'),
(8,'api','klaviyoapikey'),
(3,'auth','group'),
(2,'auth','permission'),
(4,'auth','user'),
(5,'contenttypes','contenttype'),
(6,'sessions','session'),
(7,'user','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES
(1,'contenttypes','0001_initial','2024-02-04 21:15:57.071345'),
(2,'auth','0001_initial','2024-02-04 21:16:00.917542'),
(3,'admin','0001_initial','2024-02-04 21:16:01.851176'),
(4,'admin','0002_logentry_remove_auto_add','2024-02-04 21:16:01.984167'),
(5,'admin','0003_logentry_add_action_flag_choices','2024-02-04 21:16:02.169103'),
(6,'contenttypes','0002_remove_content_type_name','2024-02-04 21:16:03.018340'),
(7,'auth','0002_alter_permission_name_max_length','2024-02-04 21:16:03.319462'),
(8,'auth','0003_alter_user_email_max_length','2024-02-04 21:16:03.629248'),
(9,'auth','0004_alter_user_username_opts','2024-02-04 21:16:03.757000'),
(10,'auth','0005_alter_user_last_login_null','2024-02-04 21:16:04.102580'),
(11,'auth','0006_require_contenttypes_0002','2024-02-04 21:16:04.233299'),
(12,'auth','0007_alter_validators_add_error_messages','2024-02-04 21:16:04.367518'),
(13,'auth','0008_alter_user_username_max_length','2024-02-04 21:16:04.644384'),
(14,'auth','0009_alter_user_last_name_max_length','2024-02-04 21:16:04.960927'),
(15,'auth','0010_alter_group_name_max_length','2024-02-04 21:16:05.248707'),
(16,'auth','0011_update_proxy_permissions','2024-02-04 21:16:05.745810'),
(17,'auth','0012_alter_user_first_name_max_length','2024-02-04 21:16:06.046283'),
(18,'sessions','0001_initial','2024-02-04 21:16:06.596599'),
(19,'user','0001_initial','2024-02-04 22:04:10.678893'),
(20,'api','0001_initial','2024-02-06 11:42:35.023345');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES
('0ucr6rvbgjwilrcge9dfg2dngcqghz5a','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgPoN:_fLFXOBFm-P0WhU2AM7AaR7esMMMWJWV7px8FcNmLd8','2024-03-16 13:53:59.088319'),
('36oelsq88fwm4e1esnl1slkhlhg4f0t1','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX43g:NW-qn_4eFVWYJ8jeB1ot4it8LRCfWXfjE3nHEbNJMaM','2024-02-19 18:51:08.568883'),
('5xvt6n7kr9s6ie8xmlwpgsqdotr1cce1','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX72X:Ouc1uj1j8yA5skZfEj1dRwvq-PmnO0Vv0jFs_E9XSlY','2024-02-19 22:02:09.650551'),
('8ytag50ts9u6rzf88pyakn3h80b1leuy','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX3Si:oem2HPf4vCgyd90kOQmc7malheL5ayqome7E8vXI31E','2024-02-19 18:12:56.689202'),
('epvpfbc7w3y3uigjxpni0tx2rmeoc3tq','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgSOg:nWUzq4jBNGBsCYd49yICAzx2JTYfinVSyCnnCCJ7tIc','2024-03-16 16:39:38.031416'),
('evn30rfp62f9fh4kmbtyyck3i0j0h7g8','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rc6ZZ:I5FcvQ-F_9Iv6zMFmo3uAjwWe3HT8IsLoMyZKTmK6sc','2024-03-04 16:32:53.668025'),
('gxo2ogvmbc76ng1fs58ty87s2rw0kb19','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rXS5O:BgyrIcjTBZxbGEcFZwv_I0VaO2Qd0R8mnQ2ocAqC0xg','2024-02-20 20:30:30.090149'),
('kg4a2vjil6nixeokkaxpm4zpewsnz5g0','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgUMK:laaxWRb8zS8wGuPGRMhwlpo9KnQlPHGyAn-pOB9t7y4','2024-03-16 18:45:20.651460'),
('kn8hn59ds5pl5enf28sq51vnw2auokkz','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX2MG:WhuyRLPanhXniUUK1VvI0q_i-GLt8HuuBRvoakHR48I','2024-02-19 17:02:12.100322'),
('l7p4ubl9aq8ulcknehnpofjv5wwmbr97','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgU8n:VGeStqhMznLcpyud3gEMTVFcMNm0Q9fBzavYkFT-x0A','2024-03-16 18:31:21.954898'),
('ov1qhkvgbi580ed91karb24mr36pumri','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgkzw:EdkSMvDSo5TYZ38niSbMkydsQ3EVIdCdN5U-9-qNf7w','2024-03-17 12:31:20.893857'),
('p6otkr4ree87dop0eysb6gs5hb5iadrd','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX6oK:6u5Nx7Pdx6v4oFKvKWrjqfInlslWOF3xijdOtO3tkSE','2024-02-19 21:47:28.703829'),
('ql4baz86zr15lrr3higu6gvm4vn6njof','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX5jZ:CU1CDKqegvdvUJnJ4uSmUo3x_r6ZkY4BP-QwrkDHcZ4','2024-02-19 20:38:29.923815'),
('rif6ofhhxffdr6f9h7ku1lhlqljzn35w','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rbFvH:tqVE8B7w06QCTXj6wAr3UBZsqyvLnb26gCc2glzdL9Y','2024-03-02 08:19:47.117107'),
('t7ngb4np4oqcu1cndtbyrl631blveeet','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgTsk:wwayDXHX3E3ogxcMsGTxkKaOzN2zmaT2ndqoVcSw5ck','2024-03-16 18:14:46.660751'),
('tnadoti4jd396hdstiolp5qe3ufn1grt','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgVgv:mFOpomJQemZG-g8IMLPl2r3vWAul_ts9Fegwyxi9xu4','2024-03-16 20:10:41.665184'),
('vafaug5u253jv12itl6fxc4pybcmncqp','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX74u:TRmtzMQjo6vd72DnulaJSQfnqpne5YkDbPcPHB1jFNE','2024-02-19 22:04:36.431726'),
('vsce0hd2gt7wivs9vgpf50cuzxagexre','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rdavO:OjL1XGQGfgZPZUQdgoVLA4p_8u4LhNe5Ka585YqYs2g','2024-03-08 19:09:34.398699'),
('wd1cal8aajkqcrgnrxo0gjp255v14zn1','.eJxVjDsOwyAQRO9CHSFWYD4p0-cMiM9ucBKBZOzKyt2DJRdJMc28N7MzH7a1-K3j4ufMrgzY5beLIb2wHiA_Q300nlpdlznyQ-En7fzeMr5vp_t3UEIvY60VRQNuJIIjGZPNJikga9AgmUyTIGf1JJMESQm1stk5FDYCDCTY5wvvNTfy:1rX5ON:3ry7Qnjt4KOfiaM9cWWkwHY6ZB-5TH1ADIHLMghlsXM','2024-02-19 20:16:35.691122'),
('zs3pwolrgcnk5w4ecy5wcph8kvj94j81','.eJxVjDsOwjAQRO_iGllaO_5R0nMGy_Hu4gCypTipEHcHSymgmWLem3mJmPatxL3TGhcUZwHi9NvNKT-oDoD3VG9N5la3dZnlUORBu7w2pOflcP8OSurlu56MYmsSgM1AyIgUMnmlOTBaNxmjmU0IWoHLFDwbhw48jKCciMT7A_AYOF4:1rgPZC:laIIkr7P5x8-KzX9WEV5oa-tkreK5ivCsgcsBhDdmGs','2024-03-16 13:38:18.545562');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user`
--

LOCK TABLES `user_user` WRITE;
/*!40000 ALTER TABLE `user_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-06 21:14:21
