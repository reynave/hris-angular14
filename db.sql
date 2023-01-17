-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table hris.auto_number
CREATE TABLE IF NOT EXISTS `auto_number` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `prefix` varchar(50) NOT NULL DEFAULT '',
  `digit` int(2) NOT NULL DEFAULT 1,
  `runningNumber` int(9) NOT NULL DEFAULT 1,
  `updateDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.auto_number: ~1 rows (approximately)
INSERT INTO `auto_number` (`id`, `name`, `prefix`, `digit`, `runningNumber`, `updateDate`) VALUES
	(1, 'personal', 'P', 6, 6, '0000-00-00 00:00:00');

-- Dumping structure for table hris.employment
CREATE TABLE IF NOT EXISTS `employment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personalId` varchar(10) NOT NULL,
  `employmentStatusId` int(3) NOT NULL DEFAULT 0,
  `dateJoinStart` date DEFAULT NULL,
  `dateJoinEnd` date DEFAULT '2030-01-01',
  `jobPositionId` int(3) DEFAULT NULL,
  `jobLevelId` int(3) DEFAULT NULL,
  `branchId` int(3) DEFAULT NULL,
  `approvalLineId` int(3) DEFAULT NULL,
  `organizationId` int(3) DEFAULT NULL,
  `inputDate` datetime DEFAULT '2023-01-01 00:00:00',
  `updateDate` datetime DEFAULT '2023-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.employment: ~0 rows (approximately)

-- Dumping structure for table hris.loan
CREATE TABLE IF NOT EXISTS `loan` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.loan: ~1 rows (approximately)
INSERT INTO `loan` (`id`, `name`) VALUES
	(1, 'Personal Load');

-- Dumping structure for table hris.payroll
CREATE TABLE IF NOT EXISTS `payroll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personalId` varchar(50) NOT NULL DEFAULT '',
  `salary` double NOT NULL DEFAULT 0,
  `salaryType` varchar(2) NOT NULL DEFAULT '',
  `bankName` varchar(50) NOT NULL DEFAULT '',
  `bankAccountNumber` varchar(50) NOT NULL DEFAULT '',
  `bankAccountHolderName` varchar(50) NOT NULL DEFAULT '',
  `hourlyRate` double NOT NULL DEFAULT 0,
  `tunjangan` double NOT NULL DEFAULT 0,
  `taxNpwp` varchar(50) NOT NULL DEFAULT '',
  `taxMethod` varchar(50) NOT NULL DEFAULT '',
  `taxableDate` date NOT NULL DEFAULT '2020-01-01',
  `taxHolderName` varchar(50) NOT NULL DEFAULT '',
  `taxPtkpStatus` varchar(50) NOT NULL DEFAULT '',
  `taxSalary` double NOT NULL DEFAULT 0,
  `EmploymentTaxStatus` int(2) NOT NULL DEFAULT 0,
  `bpsjTkNo` varchar(50) NOT NULL DEFAULT '',
  `bpsjKesehatanNo` varchar(50) NOT NULL DEFAULT '',
  `JhtCost` varchar(50) NOT NULL DEFAULT '',
  `JaminanPensiunCost` double NOT NULL DEFAULT 0,
  `JaminanPensiunDate` date NOT NULL DEFAULT '2023-01-01',
  `bpjsTkDate` date NOT NULL DEFAULT '2023-01-01',
  `bpjsKesehatanFamily` varchar(50) NOT NULL DEFAULT '',
  `updateDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  `inputDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.payroll: ~0 rows (approximately)

-- Dumping structure for table hris.personal
CREATE TABLE IF NOT EXISTS `personal` (
  `id` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `birthPlace` varchar(50) NOT NULL DEFAULT '',
  `birthDate` varchar(50) NOT NULL DEFAULT '',
  `gender` varchar(2) NOT NULL DEFAULT '',
  `marital` int(2) NOT NULL DEFAULT 0,
  `blood` varchar(2) NOT NULL DEFAULT '',
  `religion` int(2) NOT NULL DEFAULT 0,
  `idType` int(2) DEFAULT 1,
  `idNumber` varchar(50) DEFAULT '',
  `expDate` date DEFAULT '2023-01-01',
  `permanent` int(1) DEFAULT 0,
  `postalCode` varchar(6) DEFAULT '',
  `address` varchar(250) DEFAULT '',
  `presence` int(2) DEFAULT 1,
  `status` int(2) DEFAULT 1,
  `inputDate` datetime DEFAULT '2023-01-01 00:00:00',
  `updateDate` datetime DEFAULT '2023-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.personal: ~7 rows (approximately)
INSERT INTO `personal` (`id`, `name`, `phone`, `email`, `birthPlace`, `birthDate`, `gender`, `marital`, `blood`, `religion`, `idType`, `idNumber`, `expDate`, `permanent`, `postalCode`, `address`, `presence`, `status`, `inputDate`, `updateDate`) VALUES
	('1', 'gagag', 'pho123123', '', '', '', '0', 0, '', 0, 1, '', '2023-01-01', 1, '', '', 0, 0, '2023-01-16 13:32:39', '2023-01-16 13:32:39'),
	('800', 'asd', '', '', '', '', '0', 0, '', 0, 1, '', '2023-01-01', 1, '', '', 0, 0, '2023-01-16 13:32:58', '2023-01-16 13:32:58'),
	('P000002', 'asd', '', '', '', '', '0', 0, '', 0, 1, '', '2023-01-01', 1, '', '', 0, 0, '2023-01-16 13:43:32', '2023-01-16 13:43:32'),
	('P000003', 'asd 123123123', 'fsgfdfg', 'admin@abac.org', 'gagagagagag', '1990-1-27', '1', 2, 'AB', 5, 2, '5345345345', '2023-03-17', 0, '535345', '245234523 2 43 2345 2345', 1, 1, '2023-01-16 14:58:22', '2023-01-16 14:58:22'),
	('P000004', 'asd', '', '', '', '1990-1-19', '0', 0, '', 0, 1, '', '2023-01-01', 1, '', '', 1, 1, '2023-01-16 13:14:47', '2023-01-16 13:14:47'),
	('P000005', 'Cated', '1234234', 'admin@admin.com', '', '1990-1-1', 'M', 0, '', 0, 1, '', '2023-01-01', 1, '', '', 1, 1, '2023-01-16 13:16:13', '2023-01-16 13:16:13'),
	('P000006', 'fasdf', '43234234', 'rey_nave@yahoo.com', '', '1990-1-1', 'M', 0, '', 0, 1, '', '2023-01-01', 1, '', '', 1, 1, '2023-01-16 13:17:41', '2023-01-16 13:17:41');

-- Dumping structure for table hris.personal_id
CREATE TABLE IF NOT EXISTS `personal_id` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `other` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.personal_id: ~3 rows (approximately)
INSERT INTO `personal_id` (`id`, `name`, `other`) VALUES
	(1, 'KTP', 0),
	(2, 'Password', 0),
	(3, 'Other', 0);

-- Dumping structure for table hris.personal_load
CREATE TABLE IF NOT EXISTS `personal_load` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `loadId` int(9) NOT NULL DEFAULT 0,
  `personalId` varchar(9) NOT NULL DEFAULT '',
  `loadAmount` double NOT NULL DEFAULT 0,
  `installment` int(3) NOT NULL DEFAULT 0,
  `interest` int(3) NOT NULL DEFAULT 0,
  `effectiveDate` date NOT NULL DEFAULT '2023-01-01',
  `inputDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  `updateDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.personal_load: ~0 rows (approximately)

-- Dumping structure for table hris.personal_marital
CREATE TABLE IF NOT EXISTS `personal_marital` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `other` int(1) NOT NULL DEFAULT 0,
  `presence` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.personal_marital: ~4 rows (approximately)
INSERT INTO `personal_marital` (`id`, `name`, `other`, `presence`) VALUES
	(1, 'Single', 0, 1),
	(2, 'married', 0, 1),
	(3, 'Widow', 0, 1),
	(4, 'Widower', 0, 1);

-- Dumping structure for table hris.personal_religion
CREATE TABLE IF NOT EXISTS `personal_religion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `other` int(1) NOT NULL DEFAULT 0,
  `presence` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.personal_religion: ~6 rows (approximately)
INSERT INTO `personal_religion` (`id`, `name`, `other`, `presence`) VALUES
	(1, 'Islam', 0, 1),
	(2, 'Christian', 0, 1),
	(3, 'Catholic', 0, 1),
	(4, 'Buddhist', 0, 1),
	(5, 'Hindu', 0, 1),
	(6, 'Others', 0, 1);

-- Dumping structure for table hris.reimbursement
CREATE TABLE IF NOT EXISTS `reimbursement` (
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.reimbursement: ~0 rows (approximately)

-- Dumping structure for table hris.shift
CREATE TABLE IF NOT EXISTS `shift` (
  `id` varchar(9) NOT NULL DEFAULT '',
  `name` varchar(50) NOT NULL DEFAULT '',
  `scheduleIn` time NOT NULL DEFAULT '00:00:00',
  `scheduleOut` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.shift: ~0 rows (approximately)
INSERT INTO `shift` (`id`, `name`, `scheduleIn`, `scheduleOut`) VALUES
	('w', 'WEEKDAY', '08:00:00', '17:00:00');

-- Dumping structure for table hris.time_management
CREATE TABLE IF NOT EXISTS `time_management` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personalId` varchar(50) NOT NULL DEFAULT '',
  `date` varchar(50) NOT NULL DEFAULT '',
  `shiftId` int(2) NOT NULL DEFAULT 0,
  `checkIn` time NOT NULL DEFAULT '00:00:00',
  `checkOut` time NOT NULL DEFAULT '00:00:00',
  `overTime` time NOT NULL DEFAULT '00:00:00',
  `overTimeInt` int(6) NOT NULL DEFAULT 0,
  `inputDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  `updateDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.time_management: ~0 rows (approximately)

-- Dumping structure for table hris.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(50) NOT NULL DEFAULT '',
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.user: ~0 rows (approximately)

-- Dumping structure for table hris.user_access
CREATE TABLE IF NOT EXISTS `user_access` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `token` varchar(50) NOT NULL DEFAULT '',
  `inputDate` datetime NOT NULL DEFAULT '2023-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table hris.user_access: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
