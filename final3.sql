-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 24, 2018 at 07:49 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final3`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `createdAt` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `contact`, `createdAt`) VALUES
(11, 'vikrant', 'vikrantsandal0@gmail.com', '$2a$05$x3AmLofjcX159JiW9Ydyium0HzptaOO11yNDsHW/aQkarh9n0aGIG', '+919501910623', '2018-04-19 16:03:53'),
(12, 'nike', 'nike@gmail.com', '$2a$05$Xjvbn60RmLm6GOOJcxL/L.QOH0naYicwKz5dMYUzqw9Wx407.8/di', '+912020202020', '2018-04-23 14:32:43'),
(13, 'subh', 'subhkarman144326@gmail.com', '$2a$05$eoaAp13qArMYJa.8YX4cveGdyTHPoGl4hrp1ZbpExaVddU0S4l0Yu', '+9198989898989', '2018-04-23 21:26:25'),
(14, 'taran', 'taran@gmail.com', '$2a$05$.B5tBtbsK3wSNtKhRJ23SeE2a41DYhOFYxHjsOkca0bIFjNaZ18ru', '+913232323232', '2018-04-23 23:51:08'),
(15, 'nisha', 'nisha@gmail.com', '$2a$05$sZBHIgtAwIW.slXILu2s1u4.woAiJlZaTdYscF6D2PVrm5atX10Rm', '+919418465173', '2018-04-23 23:58:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
