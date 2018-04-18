-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2018 at 05:10 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(100) NOT NULL,
  `createdAt` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `user_id`, `street_address`, `city`, `state`, `pincode`, `createdAt`) VALUES
(1, '29', '430ehhe', 'mohali', 'punjab', '160071', '2018-03-25 14:04:04'),
(2, '27', '5434fff', 'gtrgr', 'gvebbb', '177204', '2018-03-25 14:16:06'),
(4, '27', 'vpo dangoh distt-una', 'daulatpur', 'Himachal Pradesh', '177204', '2018-03-25 14:26:19'),
(5, '27', 'atoz', 'amb', 'Himachal Pradesh', '169101', '2018-03-25 14:28:33'),
(6, '30', 'sector-85 mohali', 'mohali', 'punjab', '160085', '2018-03-26 11:31:26'),
(7, '30', 'sector 95', 'chandigarh', 'chandigarh', '160095', '2018-03-26 11:32:04'),
(8, '38', '34-c chandigarh', 'conjoinix', 'chandigarh', '160034', '2018-03-26 23:58:55'),
(9, '39', 'manimajra housing colony', 'manimajra', 'chandigarh', '160065', '2018-03-27 14:18:37'),
(10, '39', 'vpo barnala', 'barnala', 'barnala', '197701', '2018-03-27 16:56:20'),
(11, '40', 'bhopal', 'bhopal', 'bhopal', '909090', '2018-03-27 17:04:35'),
(12, '41', 'hisar', 'hisar', 'hisar', '909090', '2018-03-27 17:57:14'),
(13, '42', 'uttarpradesh', 'uttarpradesh', 'uttarpradesh', '19909', '2018-03-27 22:01:08'),
(14, '43', 'dangoh ', 'daulatpur', 'Himachal Pradesh', '177204', '2018-03-28 01:18:21'),
(15, '45', 'karnal', 'adad', 'asdasd', '1234555', '2018-03-28 11:43:05'),
(16, '45', 'karnal', 'karnl', 'asdasd', '1234555', '2018-03-28 11:43:16'),
(17, '46', 'delhi', 'delhi', 'delhi', '909090', '2018-03-28 15:59:08'),
(18, '46', 'gurgaon', 'gurgaon', 'guragon', '787878', '2018-03-28 16:10:04'),
(19, '47', 'dangoh vpo 177204', 'daulatpur', 'Himachal Pradesh', '177204', '2018-03-28 19:03:51'),
(20, '49', 'starks', 'winterfell', 'winterfell', '19090', '2018-03-29 09:38:31');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(20) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `contact` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `contact`) VALUES
(3, 'vikrant', 'vikrant@gmail.com', '$2a$10$s1px5BSY.eh/ZdJqc4QvLuMIj/xiKfpqU/ri1cxiIbYgusFGViD/W', '+919501910623'),
(4, 'rohan', 'rohan@gmail.com', '$2a$10$Ko9XlhvgK1cSYRqb5JZtuu9qQCmB3/YtLnKZlANzspFJ9aMtI3wBO', '+911234567890');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `address_id` varchar(50) NOT NULL,
  `driver_id` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdAt` varchar(50) NOT NULL,
  `modifiedAt` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `user_id`, `address_id`, `driver_id`, `status`, `createdAt`, `modifiedAt`) VALUES
(9, '27', '5', '4', 'cancelled', '2018-03-27 19:15:21', '2018-03-27 19:48:16'),
(10, '30', '6', '6', 'confirmed', '2018-03-27 19:51:07', ''),
(11, '40', '11', '5', 'cancelled', '2018-03-27 19:54:24', '2018-03-27 20:03:27'),
(20, '42', '13', '5', 'cancelled', '2018-03-27 23:26:52', '2018-03-27 23:30:56'),
(22, '43', '14', '5', 'confirmed', '2018-03-28 01:31:29', ''),
(23, '30', '6', '7', 'confirmed', '2018-03-28 07:58:43', ''),
(24, '45', '15', '5', 'confirmed', '2018-03-28 11:43:22', ''),
(25, '45', '16', '5', 'confirmed', '2018-03-28 11:43:27', ''),
(26, '46', '17', '4', 'confirmed', '2018-03-28 15:59:35', ''),
(27, '46', '18', '5', 'confirmed', '2018-03-28 16:10:21', ''),
(28, '47', '19', '6', 'confirmed', '2018-03-28 19:04:27', ''),
(29, '49', '20', '8', 'confirmed', '2018-03-29 09:38:49', '');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `createdAt` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `otp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`id`, `name`, `email`, `password`, `contact`, `createdAt`, `status`, `otp`) VALUES
(1, 'ush', 'ush@gmail.com', '$2a$10$0Sn.mprOWIovvWRQPptw2uyUo6uOg5Br8P9ZG9aiGo9mW5Gz1hb1a', '+919877243552', '2018-03-25 11:37:37', 1, ''),
(3, 'rampal', 'rampal@gmail.com', '$2a$10$CNI75oFcGA2pW9VmqTq6keyWoYJJMe9blksHXZ.fvgbQzzwiGT8xS', '+918989898989', '2018-03-27 12:22:40', 1, ''),
(4, 'nagi', 'nagi@gmail.com', '$2a$10$fVE1icwfsOhejc4QnmIO0OErmIdGtsPRH4AZWPC5Xw9UhFfeXIQR2', '+919646464641', '2018-03-27 12:27:47', 1, ''),
(5, 'lilwayne', 'lilwaynesandy@gmail.com', '$2a$10$LBOBNtdAZ3mWK49DDsuv2u/8B1k7JQd1jckJY7p6HzydDFguFdG.G', '+916565656566', '2018-03-27 14:44:01', 1, ''),
(6, 'ramukaka', 'ramu@gmail.com', '$2a$10$kGZ1/ck7ymWt2bEHMEZjyud7feq0y8vKIxb3/PfpnGtk.SSHXsqdq', '+916060606060', '2018-03-27 18:32:22', 1, ''),
(7, 'jawala', 'jawala@gmail.com', '$2a$10$iGDcW0cjD2PaePrs.LanF.zNHKBG2kpGr7T1R0D1hWcA.EIuHur16', '+917878787878', '2018-03-28 07:57:12', 1, ''),
(8, 'khemu', 'khemu@gmail.com', '$2a$10$MnE7LBE2krLgUXXJ/xIuS.h8ZFoDTOG80/nH97xlWal52KUmrPr.q', '+910909090909', '2018-03-28 19:55:18', 1, '1935');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `contact` varchar(40) NOT NULL,
  `createdAt` varchar(40) NOT NULL,
  `modifiedAt` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `otp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `contact`, `createdAt`, `modifiedAt`, `status`, `otp`) VALUES
(15, 'nisha', 'mom@gmail.com', '$2a$10$inmOKzLuUWk97l1JqhjlGOO8C0HcV2BRr4rZHPe11Pp0MF1k0EDMa', '+919418465173', '2018-03-23 14:24:09', '', 0, ''),
(16, 'raj', 'dad@gmail.com', '$2a$10$seh7TLU7RjvO797fY9u.GO6jw7U74B6oQ3HYz/N.qsNDfPzvdZKbK', '+919418464173', '2018-03-23 14:26:32', '', 0, ''),
(27, 'vikrant', 'vikrantsandal0@gmail.com', '$2a$10$CgLYKREAvPsgg9A20Z0tp.oQxvdsBdb7tguojCCE5Ux6fz3yWuHjW', '+919501910623', '2018-03-23 16:44:34', '', 1, ''),
(29, 'ish', 'ish@gmail.com', '$2a$10$DMQT.8BjPYr8c1yhw1Yy7OGq4BRvAaNyIVLqYIdgOz6RzN6.ty1IS', '+918729058540', '2018-03-25 13:55:24', '', 1, ''),
(30, 'vivek', 'vivek@gmail.com', '$2a$10$Lp8Xp0umBpBhCC0JHjfvOOpi6X04YMvZnRodCG/pnQ35dq0PV3fGm', '+91 98881 62971', '2018-03-26 11:26:06', '', 1, ''),
(31, 'akash', 'a@g.com', '$2a$10$7DVtgCFHYbsXq6d2sreLb./fAMMr9tQ2b01P3kyTiNqVMTO5cZG3a', '+917015369639', '2018-03-26 15:03:52', '', 1, ''),
(32, 'prashant', 'prashant@gmail.com', '$2a$10$bfrZVdzC8aPGzyTFowyh9OFvXyvyosMxCe86m2DfkeFRTU3Re632.', '+917009 844 036', '2018-03-26 15:32:28', '', 1, ''),
(33, 'vishav', 'vishav@gmail.com', '$2a$10$6l3ap.NN4FdOTG3P.CB8Cepe2SNT/h5h58vDVVawFZFwvlR/wKNqO', '+919418467132', '2018-03-26 15:58:55', '', 1, ''),
(34, 'nike', 'nike@gmail.com', '$2a$10$vfE7zUfiyBLdHEokx2q44egouQe4rvwC9nX1Y7MIokknx4X94FpH.', '+911234567890', '2018-03-26 16:08:11', '', 1, ''),
(35, 'hardik', 'hardik@gmail.com', '$2a$10$/BP0a4iAh8eqioYgZQhkLujLx4JDNMsz.YVyfTRxMdtBXLZodf4sO', '+919876543210', '2018-03-26 16:21:48', '', 1, ''),
(36, 'manu', 'manu@gmail.com', '$2a$10$9rmfi5A8CkCQZb6wI3os4et/Vy6LKU5WisRb5SsFYFspvU3Q4o0vu', '+919805399101', '2018-03-26 16:48:03', '', 1, ''),
(37, 'pingod', 'pingd@gmail.com', '$2a$10$OSgQtpCNoYs4pdKtojLkmu2juRIvZ3kZ47D5V7mE3dvt6SibMGx5y', '+917654345678', '2018-03-26 23:35:35', '', 1, ''),
(38, 'palak', 'palak@gmail.com', '$2a$10$5kawveHu.YwXuj4VS5798u82oR2PstAfTUr5Uoir3tdRFqr8g1p3.', '+919418145435', '2018-03-26 23:56:29', '', 1, ''),
(39, 'adidasnike', 'adidas@gmail.com', '$2a$10$.AtZG9pimzgCwtIkNHC8e.n3kiJ0kmUChcCQqG87tYi1zf4xpkS/u', '+916666666666', '2018-03-27 14:13:05', '2018-03-27 15:32:00', 1, ''),
(40, 'rishi', 'rishi@gmail.com', '$2a$10$q8v5YqVNMsvCeNcXyjY3Mu7rRAcY4RQ33AfI0Xdae8u1DkZv6Nwjy', '+918787878787', '2018-03-27 17:02:53', '', 1, ''),
(41, 'vikas', 'vikas@gmail.com', '$2a$10$KC.uxUTm/gcP3dYSE0Ju.uumxKleH.if88GbjmLvxFI.W1ZxZVEFm', '+919090909090', '2018-03-27 17:54:34', '', 1, ''),
(42, 'nishant', 'nishant@gmail.com', '$2a$10$0BLH53sGA8U6XVoTTz8JV.xZ5hBglCq4ziEnKFS76g57fSpKBwGVi', '+919191919191', '2018-03-27 21:59:43', '', 1, ''),
(43, 'vidya', 'vidya@gmail.com', '$2a$10$9wC1D7UmfstEnUz38Q8tNO.ckgDKj582NzZsr6Hc7xhzV0q.IqB3q', '+918908585890', '2018-03-28 01:17:04', '', 1, ''),
(45, 'akash1', 'a1@g.com', '$2a$10$mWL5qAHkiFNWadgMCxjfqOGehjKOikvhXL1tXgP2JiGTjuMZMCUAO', '+919501910626', '2018-03-28 11:37:53', '', 1, ''),
(46, 'madam', 'madam@gmail.com', '$2a$10$x0svA/lNYiDoec/YH3cpyOnhM4LILorQda6ohVbjOTBvXZGV6beeG', '+918989898989', '2018-03-28 15:57:35', '', 1, ''),
(47, 'karuna', 'karuna@gmail.com', '$2a$10$QArppF0hBdW0OzEoyG5B3.L.RH5wNW/KYad.juVUyTSXYlgo76WTy', '+919418226022', '2018-03-28 19:01:33', '', 1, ''),
(48, 'simran', 'simran@gmail.com', '$2a$10$FhuDCKSSzYZdf0Dnjh/eI.9WH8DZMhmTlOucuTAGrk9.Kze1Qzow.', '+914040404040', '2018-03-28 19:39:04', '', 1, '1017'),
(49, 'thrones', 'thrones@gmail.com', '$2a$10$k.NIvbjvDVVNTXBuXDtPsuikerdUaS09EuAebZOYb0Ro5zOQ2nom6', '+914545454545', '2018-03-29 09:34:25', '', 1, '2621');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`),
  ADD KEY `name_2` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name_3` (`name`);
ALTER TABLE `user` ADD FULLTEXT KEY `name_2` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
