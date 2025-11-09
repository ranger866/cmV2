-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2025 at 02:00 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contacts_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gender` enum('Laki-Laki','Perempuan') DEFAULT NULL,
  `group_contacts` enum('Keluarga','Kantor','Teman') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `user_id`, `name`, `email`, `phone`, `address`, `gender`, `group_contacts`, `created_at`, `updated_at`) VALUES
(1, 2, 'kiki', 'kiki@example.com', '123456', 'YTTA', 'Laki-Laki', 'Teman', '2025-11-05 05:18:49', '2025-11-09 14:43:16'),
(4, 4, 'adfad', 'adfad@contoh.com', '987654', 'dhkjkj', NULL, NULL, '2025-11-05 05:39:04', NULL),
(12, 2, 'Rehan', 'rehan@contoh.com', '535657674', 'Keramat', 'Laki-Laki', 'Teman', '2025-11-09 14:44:12', NULL),
(13, 2, 'Rini', 'rini@contoh.com', '954024365', 'Huntu', 'Perempuan', 'Teman', '2025-11-09 14:46:02', NULL),
(14, 2, 'Gilang', 'gilang@contoh.com', '572395625', 'Bandung', 'Laki-Laki', 'Kantor', '2025-11-09 14:47:20', NULL),
(15, 2, 'Mama', 'mama@contoh.com', '235536277868', 'Rumah', 'Perempuan', 'Keluarga', '2025-11-09 19:04:49', NULL),
(16, 2, 'Papa', 'papa@contoh.com', '4579274742956', 'Rumah', 'Laki-Laki', 'Keluarga', '2025-11-09 20:26:02', NULL),
(17, 2, 'Kakak', 'kakak@contoh.com', '85602474505', 'Rumah', 'Laki-Laki', 'Keluarga', '2025-11-09 20:30:30', '2025-11-09 20:47:35'),
(18, 2, 'Ade', 'ade@contoh.com', '487591524352', 'Rumah', 'Perempuan', 'Keluarga', '2025-11-09 20:48:04', NULL),
(19, 2, 'Iki', 'iki@contoh.com', '947029053709', 'Tetangga', 'Laki-Laki', 'Keluarga', '2025-11-09 20:48:28', NULL),
(20, 2, 'Rendi', 'rendi@contoh.com', '90328091', 'Tupa', 'Laki-Laki', 'Kantor', '2025-11-09 20:49:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'demo', 'demo@example.com', '$2y$10$Qe8H5FhH4iI0QpNqGf2xKe1x7o7qZk2vX1r5kV0Qe6b9tH8L9sY0u', '2025-11-05 05:08:15'),
(2, 'admin', 'admin@example.com', '$2y$10$5WSi46.qQiCSifsjGH2TeOkqqDR8OK4qH1x3HxVqfaq02J63nIkUO', '2025-11-05 05:16:34'),
(4, 'demo123', 'demo123@example.com', '$2y$10$fzPqKETkkFql81gsx5ge0ezFsmJ1rcrJVPQa/ziCUERNgH431MB1W', '2025-11-05 05:38:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
