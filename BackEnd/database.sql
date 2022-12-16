-- --------------------------------------------------------

-- Hôte:                         127.0.0.1

-- Version du serveur:           8.0.30 - MySQL Community Server - GPL

-- SE du serveur:                Win64

-- HeidiSQL Version:             12.2.0.6576

-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET NAMES utf8 */

;

/*!50503 SET NAMES utf8mb4 */

;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */

;

/*!40103 SET TIME_ZONE='+00:00' */

;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */

;

-- Listage de la structure de la base pour impot

DROP DATABASE IF EXISTS `impot`;

CREATE DATABASE
    IF NOT EXISTS `impot`
    /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */
    /*!80016 DEFAULT ENCRYPTION='N' */
;

USE `impot`;

-- Listage de la structure de table impot. admin

DROP TABLE IF EXISTS `admin`;

CREATE TABLE
    IF NOT EXISTS `admin` (
        `id` int NOT NULL AUTO_INCREMENT,
        `nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
        `username` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
        `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
        `type` enum('SUPER', 'SIMPLE') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'SIMPLE',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table impot. habilitation

DROP TABLE IF EXISTS `habilitation`;

CREATE TABLE
    IF NOT EXISTS `habilitation` (
        `id` int NOT NULL AUTO_INCREMENT,
        `date_ajout` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `contenu` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
        `id_Utilisateur` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `Habilitation_Utilisateur_FK` (`id_Utilisateur`),
        CONSTRAINT `Habilitation_Utilisateur_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table impot. impot

DROP TABLE IF EXISTS `impot`;

CREATE TABLE
    IF NOT EXISTS `impot` (
        `id` int NOT NULL AUTO_INCREMENT,
        `date_ajout` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `facture` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
        `mois` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
        `annee` year NOT NULL,
        `id_Utilisateur` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `Impot_Utilisateur_FK` (`id_Utilisateur`),
        CONSTRAINT `Impot_Utilisateur_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table impot. teledeclaration

DROP TABLE IF EXISTS `teledeclaration`;

CREATE TABLE
    IF NOT EXISTS `teledeclaration` (
        `id` int NOT NULL AUTO_INCREMENT,
        `date_ajout` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `contenu` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
        `id_Utilisateur` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `Teledeclaration_Utilisateur_FK` (`id_Utilisateur`),
        CONSTRAINT `Teledeclaration_Utilisateur_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table impot. utilisateur

DROP TABLE IF EXISTS `utilisateur`;

CREATE TABLE
    IF NOT EXISTS `utilisateur` (
        `id` int NOT NULL AUTO_INCREMENT,
        `username` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
        `date_inscription` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
        `prenom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
        `cin` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
        `adresse` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
        `phone` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
        `pdcUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
        `password` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `username` (`username`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */

;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */

;

/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */

;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */

;