-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2024 at 08:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoes_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_brand`
--

CREATE TABLE `tb_brand` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `img_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_brand`
--

INSERT INTO `tb_brand` (`id`, `name`, `code`, `img_url`) VALUES
(1, 'Nike', 'nike', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/nike-logo-49337.png'),
(2, 'Adidas', 'adidas', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/pngwing.com.png'),
(3, 'Converse', 'converse', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/pngwing.com_1.png'),
(4, 'New Balance', 'newbalance', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/dark-emblem-new-balance-logo-png-3.png');

-- --------------------------------------------------------

--
-- Table structure for table `tb_cart`
--

CREATE TABLE `tb_cart` (
  `id` int(11) NOT NULL,
  `size` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_discount` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_favorite`
--

CREATE TABLE `tb_favorite` (
  `id` int(11) NOT NULL,
  `favorite_on` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_order`
--

CREATE TABLE `tb_order` (
  `id` int(11) NOT NULL,
  `total_amount` float NOT NULL,
  `order_date` varchar(255) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `province` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`province`)),
  `district` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`district`)),
  `ward` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ward`)),
  `is_paid` tinyint(1) NOT NULL,
  `payment` varchar(255) NOT NULL,
  `status_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_order`
--

INSERT INTO `tb_order` (`id`, `total_amount`, `order_date`, `shipping_address`, `phone_number`, `customer_name`, `email`, `province`, `district`, `ward`, `is_paid`, `payment`, `status_id`, `user_id`) VALUES
(1, 171, '23/02/2024', 'Xóm 9', '0826127626', 'Bùi Chí Vĩ', 'buichivi04062002@gmail.com', '{\"province_id\": \"34\", \"province_name\": \"T\\u1ec9nh Th\\u00e1i B\\u00ecnh\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"343\", \"district_name\": \"Huy\\u1ec7n Ki\\u1ebfn X\\u01b0\\u01a1ng\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"34\"}', '{\"district_id\": \"343\", \"ward_id\": \"13144\", \"ward_name\": \"X\\u00e3 Quang B\\u00ecnh\", \"ward_type\": \"X\\u00e3\"}', 1, 'paypal', 2, 2),
(2, 264, '24/02/2024', 'Xóm 9', '0826127626', 'Bùi Chí Vĩ', 'buichivi04062002@gmail.com', '{\"province_id\": \"34\", \"province_name\": \"T\\u1ec9nh Th\\u00e1i B\\u00ecnh\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"343\", \"district_name\": \"Huy\\u1ec7n Ki\\u1ebfn X\\u01b0\\u01a1ng\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"34\"}', '{\"district_id\": \"343\", \"ward_id\": \"13144\", \"ward_name\": \"X\\u00e3 Quang B\\u00ecnh\", \"ward_type\": \"X\\u00e3\"}', 1, 'paypal', 1, 2),
(3, 1280, '24/02/2024', 'hn', '0826127626', 'Bùi Chí minh', 'minh@gmail.com', '{\"province_id\": \"08\", \"province_name\": \"T\\u1ec9nh Tuy\\u00ean Quang\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"074\", \"district_name\": \"Huy\\u1ec7n H\\u00e0m Y\\u00ean\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"08\"}', '{\"district_id\": \"074\", \"ward_id\": \"02407\", \"ward_name\": \"X\\u00e3 Th\\u00e1i S\\u01a1n\", \"ward_type\": \"X\\u00e3\"}', 0, 'COD', 1, 5),
(4, 144, '24/02/2024', 'Xóm 9', '0826127626', 'Bùi Chí Vĩ', 'buichivi04062002@gmail.com', '{\"province_id\": \"34\", \"province_name\": \"T\\u1ec9nh Th\\u00e1i B\\u00ecnh\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"343\", \"district_name\": \"Huy\\u1ec7n Ki\\u1ebfn X\\u01b0\\u01a1ng\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"34\"}', '{\"district_id\": \"343\", \"ward_id\": \"13144\", \"ward_name\": \"X\\u00e3 Quang B\\u00ecnh\", \"ward_type\": \"X\\u00e3\"}', 0, 'COD', 4, 2),
(5, 126, '28/02/2024', 'Xóm 9', '0826127626', 'Bùi Chí Vĩ', 'buichivi04062002@gmail.com', '{\"province_id\": \"34\", \"province_name\": \"T\\u1ec9nh Th\\u00e1i B\\u00ecnh\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"343\", \"district_name\": \"Huy\\u1ec7n Ki\\u1ebfn X\\u01b0\\u01a1ng\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"34\"}', '{\"district_id\": \"343\", \"ward_id\": \"13144\", \"ward_name\": \"X\\u00e3 Quang B\\u00ecnh\", \"ward_type\": \"X\\u00e3\"}', 0, 'COD', 1, 2),
(6, 72, '28/02/2024', 'Xóm 9', '0826127626', 'Bùi Chí Vĩ', 'buichivi04062002@gmail.com', '{\"province_id\": \"34\", \"province_name\": \"T\\u1ec9nh Th\\u00e1i B\\u00ecnh\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"343\", \"district_name\": \"Huy\\u1ec7n Ki\\u1ebfn X\\u01b0\\u01a1ng\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"34\"}', '{\"district_id\": \"343\", \"ward_id\": \"13144\", \"ward_name\": \"X\\u00e3 Quang B\\u00ecnh\", \"ward_type\": \"X\\u00e3\"}', 0, 'COD', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_order_detail`
--

CREATE TABLE `tb_order_detail` (
  `id` int(11) NOT NULL,
  `size` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `total_price` float NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_order_detail`
--

INSERT INTO `tb_order_detail` (`id`, `size`, `quantity`, `price`, `total_price`, `order_id`, `product_id`) VALUES
(1, '39', 1, 89, 72, 1, 1),
(2, '41', 1, 99, 99, 1, 4),
(3, '39', 2, 89, 144, 2, 1),
(4, '39', 1, 120, 120, 2, 2),
(5, '41', 10, 150, 1280, 3, 10),
(6, '39', 2, 89, 144, 4, 1),
(7, '40', 1, 140, 126, 5, 3),
(8, '39', 1, 89, 72, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_order_status`
--

CREATE TABLE `tb_order_status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_order_status`
--

INSERT INTO `tb_order_status` (`id`, `status`) VALUES
(4, 'Delivered'),
(1, 'Pending'),
(2, 'Processing'),
(3, 'Shipped');

-- --------------------------------------------------------

--
-- Table structure for table `tb_product`
--

CREATE TABLE `tb_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `img_preview` text NOT NULL,
  `featured` tinyint(1) NOT NULL,
  `manufacture_date` varchar(255) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `shoe_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_product`
--

INSERT INTO `tb_product` (`id`, `name`, `description`, `price`, `discount`, `img_preview`, `featured`, `manufacture_date`, `brand_id`, `shoe_type_id`) VALUES
(1, 'Air Jordan 1 Low G', 'AN \'85 ICON REMADE FOR THE COURSE.\r\n\r\n\r\nFeel unbeatable, from the tee box to the final putt. Inspired by one of the most iconic sneakers of all time, the Air Jordan 1 G is an instant classic on the course. With Air cushioning underfoot, a Wings logo on the heel and an integrated traction pattern to help you power through your swing, it delivers all the clubhouse cool of the original AJ1—plus everything you need to play 18 holes in comfort.\r\n\r\n\r\nStitch-for-Stitch Construction\r\n\r\nGenuine leather and bold colour-blocking recreate the classic look.\r\n\r\n\r\nAir Cushioning\r\n\r\nEncapsulated Air in the heel cushions every step.\r\n\r\n\r\nHeritage Traction\r\n\r\nBased on the design of the original outsole, the integrated traction pattern includes a forefoot pivot circle.\r\n\r\n\r\nProduct Details\r\n\r\nOne-year waterproof warranty\r\nColour Shown: White/Varsity Red/Obsidian\r\nStyle: DD9315-113\r\nCountry/Region of Origin: China', 89, 20, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan.jpg', 1, '23/02/2024', 1, 1),
(2, 'Jordan Spizike Low', 'The Spizike takes elements of four classic Jordans, combines them and gives you one iconic sneaker. It\'s an homage to Spike Lee formally introducing Hollywood and hoops in a culture moment. You get a great-looking pair of kicks with some history. What more can you ask for? Ya dig?\r\n\r\n\r\nBenefits\r\n\r\nThe real and synthetic leather and textile upper adds durability.\r\nNike Air technology absorbs impact for cushioning with every step.\r\nSolid rubber outsole provides durability and traction.\r\nColour Shown: Black/Cool Grey/Sail/Gym Red\r\nStyle: FQ1759-006\r\nCountry/Region of Origin: Vietnam', 120, 0, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-spizike-low-shoes-pBZk7c.jpg', 1, '23/02/2024', 1, 1),
(3, 'Jordan Max Aura 5', 'Whenyou need a shoe that\'s ready 24/7, it\'s gotta be the Max Aura 5. Inspired by the AJ3, this pair of kicks puts a modern spin on the classic. They\'re made from durable leather and textiles that sit atop a heel of Nike Air cushioning so you can walk, run or skate all day and still have fresh-feeling soles.', 140, 10, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-max-aura-5-shoes-ZBZ4Pz.jpg', 1, '23/02/2024', 1, 1),
(4, 'Nike Air Force 1 \'07', 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.\r\n\r\nColour Shown: White/White\r\nStyle: CW2288-111', 99, 0, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-shoes-WrLlWX.jpg', 1, '23/02/2024', 1, 2),
(5, 'Nike Air Force 1 Shadow', 'Everything you love about the AF-1—but doubled! The Air Force 1 Shadow puts a playful twist on a hoops icon to highlight the best of AF-1 DNA. With 2 eyestays, 2 mudguards, 2 backtabs and 2 Swoosh logos, you get a layered look with double the branding.\r\n\r\nColour Shown: White/Malachite/Sesame/Midnight Navy\r\nStyle: DZ1847-102', 140, 15, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-shadow-shoes-3d774m.jpg', 1, '23/02/2024', 1, 2),
(6, 'Nike G.T. Cut 3 ASW EP', 'How can you separate your game when it\'s winning time? Start by lacing up in the G.T. Cut 3. Designed to help you create space for stepback jumpers and backdoor cuts, its sticky multi-court traction helps you stop in an instant and shift gears at will. And when you\'re making all those game-changing plays, the newly added, ultra-responsive ZoomX foam helps keep you fresh for all four quarters. This design straps you into the wayback machine and teleports you to one of Nike\'s golden eras of hoops, with direct inspiration derived from the famed Air Zoom Flight 5. Donned by the legends, destined to help take your game to the next level. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.', 160, 20, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/basketball-nike.jpg', 1, '23/02/2024', 1, 3),
(7, 'Nike Air Force 1 \'07 LV8', 'The radiance lives on in the Air Force 1 \'07 LV8. This b-ball original puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine. This winter-ready version helps keep you warm and has traction to beat the elements.', 100, 0, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-lv8-shoes-hHz3rg.jpg', 1, '23/02/2024', 1, 2),
(8, 'Zion 3 \'Z-3D\' PF', 'Zion\'s got a thing for nostalgia, and the Z-3D brings that love to life. The shoe itself is designed with court-ready tech designed to help you stay low, stay contained and explode skywards with a cushioned return to earth.\r\n\r\n', 210, 0, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/zion-3-z-3d-pf-basketball-shoes-165ZqH.jpg', 1, '23/02/2024', 1, 3),
(9, 'Jordan Stay Loyal 3', 'You gotta know where you\'ve been to know where you\'re going. We took that to heart when creating the Stay Loyal 3, a modern shoe built on the Air Jordan legacy. Inside and out, they\'re made for versatility, with minimalist looks, cloud-like cushioning and design elements that echo the AJ4. In other words, style with proven lasting power.', 300, 50, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-stay-loyal-3-shoes-GNHN2X.jpg', 1, '24/02/2024', 1, 1),
(10, 'PREDATOR LEAGUE FIRM GROUND FOOTBALL BOOTS', 'The game\'s all about goals, and these football boots are crafted to find the net. Every. Time. Target perfection in all-new adidas Predator. Covered in a 3D texture and featuring grippy Strikescale fins on its medial side, the Hybridfeel upper is optimised for accurate shooting. Down below, a full-length Controlplate 2.0 tooling offers stability to cut, swerve and score on firm ground.\r\n\r\nThis product features at least 20% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources and reduce the footprint of the products we make.', 150, 15, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/adidas-football.png', 1, '24/02/2024', 2, 5),
(11, 'COPA PURE II LEAGUE TURF BOOTS', 'To truly run a game, you need to keep your teammates close and the ball closer. Find the freedom to conduct play in comfortable, classy adidas Copa Pure II. Boasting heritage details and a cow leather forefoot, these football boots look and feel iconic. The lug rubber outsole keeps your play stylish on artificial turf.\r\n\r\nThis product features at least 20% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources and reduce the footprint of the products we make.', 150, 25, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/Copa_Pure_II_League_Turf_Boots_Beige_IE4986_01_standard_hover.png', 1, '24/02/2024', 2, 5),
(12, 'PREDATOR ACCURACY.4 TURF BOOTS', 'Top corner. Bottom corner. All the corners. adidas Predator Accuracy is crafted for goalscoring, so you know the ball will find the net. The fun\'s in choosing how it gets there. The comfortable synthetic upper on these football boots has a slightly textured finish. The lug rubber outsole is designed to keep you in control on artificial turf courts.\r\n\r\nMade with a series of recycled materials, this upper features at least 50% recycled content. This product represents just one of our solutions to help end plastic waste.', 150, 35, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/Predator_Accuracy.4_Turf_Boots_Blue_GY9996_01_standard_hover.png', 1, '24/02/2024', 2, 5),
(15, 'D.O.N. ISSUE 5 SHOES', 'From the moment he first stepped onto the hardwood, Donovan Mitchell has been a game changer, and that\'s continued even as his game has grown and evolved. These D.O.N. Issue 5 signature shoes from adidas Basketball continue to build on Spida\'s on-court persona as well as his off-court social activism. Riding an ultra-lightweight Lightstrike midsole and a unique rubber outsole with an elevated traction pattern, these basketball trainers help you dominate the game just like one of the sport\'s very best.\r\n\r\n', 180, 25, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/D.O.N._Issue_5_Shoes_White_IE7799_01_standard.png', 0, '24/02/2024', 2, 6),
(16, 'TRAE YOUNG 3 LOW TRAINERS', 'SIGNATURE SNEAKERS FROM TRAE YOUNG AND ADIDAS BASKETBALL.\r\nGet ready for what\'s next. This iteration of the signature trainers from Trae Young and adidas Basketball is all about the future of the game. Celebrating Trae\'s unique look, crowd-pleasing bravado and expressive, futuristic style of play, these shoes are built for optimised motion and stability, two elements of Trae\'s game that have elevated him to superstar status. The midsole ensures your most explosive moves can be done at top speed while a rubber outsole adds support on hard plants and cuts.', 210, 30, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/Trae_Young_3_Low_Trainers_White_IE2704_01_standard.png', 0, '24/02/2024', 2, 6),
(19, 'Chuck 70 Low Top', '<div id=\"target\" class=\"pdp_description\" style=\"margin-bottom: 1.5rem; color: rgb(0, 0, 0); font-family: proxima-nova, arial, sans-serif; font-size: 12.25px;\"><p style=\"margin-top: 0rem; font-size: 1.4rem;\">The Converse All Star Chuck ’70 is our re-crafted sneaker that uses modern details to celebrate the original Chuck Taylor All Star from the 1970\'s. It features a slightly higher rubber foxing, a cushioned footbed that provides long-lasting comfort and a more substantial rubber toe cap. Additional vintage details include stitching on the sidewall and a heavier-grade canvas upper for comfort and durability. It’s an authentic throwback look that retains the iconic Chuck Taylor attributes you know and love, like the star-centered heel patch and vulcanized rubber outsole.</p></div><div class=\"pdp_desc--title text--upper text--bold\" style=\"font-size: 1.2rem; margin-bottom: 1.5rem; text-transform: uppercase; font-weight: 700; color: rgb(0, 0, 0); font-family: proxima-nova, arial, sans-serif;\">WHY YOU SHOULD BE DOWN</div><ul class=\"pdp-tab__list\" style=\"margin-top: 0rem; margin-bottom: 2.5rem; padding-left: 1.25em; font-size: 12.25px; color: rgb(0, 0, 0); font-family: proxima-nova, arial, sans-serif;\"><li class=\"pdp-tab__list-item\" style=\"list-style: none; margin-top: 0rem; margin-bottom: 1rem;\">Archival details like higher rubber siding</li><li class=\"pdp-tab__list-item\" style=\"list-style: none; margin-top: 0rem; margin-bottom: 1rem;\">Ortholite™ cushioned footbed</li><li class=\"pdp-tab__list-item\" style=\"list-style: none; margin-top: 0rem; margin-bottom: 1rem;\">Classic All Star ankle patch, rubber toecap, toe bumper and striping</li></ul><div class=\"pdp_desc--title text--upper text--bold\" style=\"font-size: 1.2rem; margin-bottom: 1.5rem; text-transform: uppercase; font-weight: 700; color: rgb(0, 0, 0); font-family: proxima-nova, arial, sans-serif;\">CHUCK 70</div><div class=\"pdp_origins\" style=\"margin-bottom: 1.5rem; color: rgb(0, 0, 0); font-family: proxima-nova, arial, sans-serif; font-size: 12.25px;\"><p style=\"margin-top: 0rem; font-size: 1.4rem;\">The Chuck 70 is a re-crafted throwback that uses modern design to celebrate the original All Star from the 1970s. Things like more cushioning and thicker rubber let you rediscover that era of classic basketball off the court. It has the look and feel of a ‘70s-era court Chuck, but without the smell.</p></div>', 95, 0, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/converse-chuck_70_low_top.jpg', 0, '07/03/2024', 3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `tb_product_image`
--

CREATE TABLE `tb_product_image` (
  `id` int(11) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_product_image`
--

INSERT INTO `tb_product_image` (`id`, `img_url`, `product_id`) VALUES
(35, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-jordan-1-low-g-golf-shoes-8bKbqs1.jpg', 1),
(36, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-jordan-1-low-g-golf-shoes-8bKbqs_2.jpg', 1),
(37, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-jordan-1-low-g-golf-shoes-8bKbqs3.jpg', 1),
(38, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-jordan-1-low-g-golf-shoes-8bKbqs4.jpg', 1),
(39, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-spizike-low-shoes-pBZk7c1.jpg', 2),
(40, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-spizike-low-shoes-pBZk7c2.jpg', 2),
(41, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-spizike-low-shoes-pBZk7c_3.jpg', 2),
(42, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-spizike-low-shoes-pBZk7c_4.jpg', 2),
(43, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-spizike-low-shoes-pBZk7c_5.jpg', 2),
(44, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-max-aura-5-shoes-ZBZ4Pz1.jpg', 3),
(45, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-max-aura-5-shoes-ZBZ4Pz2.jpg', 3),
(46, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-max-aura-5-shoes-ZBZ4Pz3.jpg', 3),
(47, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-max-aura-5-shoes-ZBZ4Pz4.jpg', 3),
(48, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-shoes-WrLlWX_1.jpg', 4),
(49, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-shoes-WrLlWX_2.jpg', 4),
(50, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-shoes-WrLlWX_3.jpg', 4),
(51, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-shoes-WrLlWX_4.jpg', 4),
(52, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-shadow-shoes-3d774m_1.jpg', 5),
(53, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-shadow-shoes-3d774m_2.jpg', 5),
(54, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-shadow-shoes-3d774m_3.jpg', 5),
(55, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-shadow-shoes-3d774m_4.jpg', 5),
(56, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-shadow-shoes-3d774m_5.jpg', 5),
(57, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/gt-cut-3-asw-ep-basketball-shoes-hMM20h_1.jpg', 6),
(58, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/gt-cut-3-asw-ep-basketball-shoes-hMM20h_2.jpg', 6),
(59, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/gt-cut-3-asw-ep-basketball-shoes-hMM20h_3.jpg', 6),
(60, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/gt-cut-3-asw-ep-basketball-shoes-hMM20h_4.jpg', 6),
(61, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-lv8-shoes-hHz3rg1.jpg', 7),
(62, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-lv8-shoes-hHz3rg_2.jpg', 7),
(63, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-lv8-shoes-hHz3rg3.jpg', 7),
(64, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-lv8-shoes-hHz3rg4.jpg', 7),
(65, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/zion-3-z-3d-pf-basketball-shoes-165ZqH_1.jpg', 8),
(66, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/zion-3-z-3d-pf-basketball-shoes-165ZqH_2.jpg', 8),
(67, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/zion-3-z-3d-pf-basketball-shoes-165ZqH_3.jpg', 8),
(68, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/zion-3-z-3d-pf-basketball-shoes-165ZqH_4.jpg', 8),
(69, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/zion-3-z-3d-pf-basketball-shoes-165ZqH_5.jpg', 8),
(70, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-stay-loyal-3-shoes-GNHN2X_1.jpg', 9),
(71, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-stay-loyal-3-shoes-GNHN2X_2.jpg', 9),
(72, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-stay-loyal-3-shoes-GNHN2X_3.jpg', 9),
(73, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan-stay-loyal-3-shoes-GNHN2X4.jpg', 9);

-- --------------------------------------------------------

--
-- Table structure for table `tb_product_size`
--

CREATE TABLE `tb_product_size` (
  `id` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `quantity_in_stock` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_product_size`
--

INSERT INTO `tb_product_size` (`id`, `size`, `quantity_in_stock`, `product_id`) VALUES
(1, 39, 40, 1),
(2, 40, 50, 1),
(3, 41, 26, 1),
(4, 42, 57, 1),
(5, 39, 40, 2),
(6, 40, 32, 2),
(7, 41, 35, 2),
(8, 42, 52, 2),
(9, 40, 123, 3),
(10, 41, 52, 3),
(11, 42, 23, 3),
(12, 43, 63, 3),
(13, 40, 53, 4),
(14, 41, 62, 4),
(15, 42, 42, 4),
(16, 43, 63, 4),
(17, 39, 35, 5),
(18, 40, 45, 5),
(19, 41, 62, 5),
(20, 42, 73, 5),
(21, 40, 63, 6),
(22, 41, 46, 6),
(23, 42, 53, 6),
(24, 43, 72, 6),
(25, 39, 53, 7),
(26, 40, 0, 7),
(27, 42, 52, 7),
(28, 41, 63, 7),
(29, 40, 52, 8),
(30, 41, 73, 8),
(31, 42, 62, 8),
(32, 43, 63, 8),
(33, 39, 0, 9),
(34, 40, 25, 9),
(35, 41, 62, 9),
(36, 42, 51, 9),
(37, 39, 63, 10),
(38, 40, 64, 10),
(39, 41, 62, 10),
(40, 42, 23, 10),
(41, 40, 35, 11),
(42, 41, 65, 11),
(43, 42, 63, 11),
(44, 43, 64, 11),
(45, 39, 45, 12),
(46, 40, 56, 12),
(47, 41, 63, 12),
(48, 42, 52, 12),
(49, 39, 26, 15),
(50, 40, 53, 15),
(51, 41, 54, 15),
(52, 39, 0, 16),
(53, 40, 54, 16),
(54, 41, 63, 16),
(55, 42, 0, 16);

-- --------------------------------------------------------

--
-- Table structure for table `tb_review`
--

CREATE TABLE `tb_review` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `comment_on` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_review`
--

INSERT INTO `tb_review` (`id`, `rating`, `title`, `comment`, `comment_on`, `product_id`, `user_id`) VALUES
(1, 5, 'Nice', 'Good shoe!!!', '23/02/2024', 1, 2),
(2, 5, 'awfawf', 'awfawfawf', '24/02/2024', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_shoe_type`
--

CREATE TABLE `tb_shoe_type` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `img_url` text DEFAULT NULL,
  `brand_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_shoe_type`
--

INSERT INTO `tb_shoe_type` (`id`, `name`, `code`, `img_url`, `brand_id`) VALUES
(1, 'Jordan', 'jordan', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/jordan.jpg', 1),
(2, 'Air Force 1', 'airforce1', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/air-force-1-07-shoes-WrLlWX.jpg', 1),
(3, 'Basketball', 'basketball', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/basketball-nike.jpg', 1),
(5, 'Football', 'football', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/adidas-football.png', 2),
(6, 'Basketball ', 'basketball', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/adidas-basketball.png', 2),
(8, 'Running', 'running', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/adidas-running_2.png', 2),
(9, 'Low Top', 'lowtop', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/converse-lowtop.jpg', 3),
(10, 'High Top', 'hightop', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/converse-hightop.jpg', 3),
(11, 'Platform', 'platform', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/converse-platform.jpg', 3),
(12, 'Running', 'running', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/newbalance-running.png', 4),
(13, 'Life Style', 'lifestyle', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/newbalance-lifestyle.png', 4),
(14, 'Basketball ', 'basketball ', 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/newbalance-basketball.png', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tb_slider`
--

CREATE TABLE `tb_slider` (
  `id` int(11) NOT NULL,
  `img_url` text NOT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_slider`
--

INSERT INTO `tb_slider` (`id`, `img_url`, `order`) VALUES
(1, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/slider-4.jpg', 1),
(2, 'https://storage.googleapis.com/shoes-store-4cb03.appspot.com/slider-3.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `dateOfBirth` varchar(50) DEFAULT NULL,
  `phoneNumber` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `dateOfBirth`, `phoneNumber`, `address`, `province`, `district`, `ward`) VALUES
(1, 'Bui Chi', 'Vi', 'admin@gmail.com', 'scrypt:32768:8:1$BIP20lge4zl33Aal$5cfde7a947da5cce813abaec0ee34d29044f47e57e7398673a807757471271747f86f5b0c4fdce77e33509da824d4f792ff5e0edcf301410bdbba4be348f2c8d', 'ADMIN', NULL, NULL, NULL, '{\"province_id\": -1}', '{\"district_id\": -1}', '{\"ward_id\": -1}'),
(2, 'Bùi Chí', 'Vĩ', 'buichivi04062002@gmail.com', 'scrypt:32768:8:1$LFXT420cPv9Gf9Ca$cd351aef82a479aab31349497d1106ba13354820a80c315f4d02c12c99e2a442fb9758788a7e82a87d8558a9fca9dc34b3059d128e06468f8dc6c67d03bd2298', 'CUSTOMER', '2002-04-06', '0826127626', 'Xóm 9', '{\"province_id\": \"34\", \"province_name\": \"T\\u1ec9nh Th\\u00e1i B\\u00ecnh\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"343\", \"district_name\": \"Huy\\u1ec7n Ki\\u1ebfn X\\u01b0\\u01a1ng\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"34\"}', '{\"district_id\": \"343\", \"ward_id\": \"13144\", \"ward_name\": \"X\\u00e3 Quang B\\u00ecnh\", \"ward_type\": \"X\\u00e3\"}'),
(3, 'Bùi Chí', 'Vĩ', 'buichivi@gmail.com', 'scrypt:32768:8:1$TNdkDaFo1odplVPa$2419449e8d7291be5217d3f75112d92e64efcd44d74377be6f438b09914cf248122f424811e8deffe07d881958aeb8cb5cc18e4b684d2c030614c2ac07be368e', 'CUSTOMER', '1999-01-01', '0826127626', 'dwdawasa dadcawcdawd', '{\"province_id\": \"95\", \"province_name\": \"T\\u1ec9nh B\\u1ea1c Li\\u00eau\", \"province_type\": \"T\\u1ec9nh\"}', '{\"district_id\": \"961\", \"district_name\": \"Huy\\u1ec7n Ho\\u00e0 B\\u00ecnh\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"95\"}', '{\"district_id\": \"961\", \"ward_id\": \"31927\", \"ward_name\": \"X\\u00e3 V\\u0129nh H\\u1eadu\", \"ward_type\": \"X\\u00e3\"}'),
(4, 'Bùi Chí', 'Vĩ', 'buichivi123@gmail.com', 'scrypt:32768:8:1$gkBiFoMI8GLwJy5p$7750fdf77d2c0bf74290ad64a57ea3e463ccd80cda04200c674dfc70aa20d0a0de72c3cc038a5a2d8a30a62c25877c3f238f3b941ac366366468360b66cc6bd2', 'CUSTOMER', '1999-01-01', '0826127626', 'bahjdvahw bdhawgdhjawdaw', '{\"province_id\": \"01\", \"province_name\": \"Th\\u00e0nh ph\\u1ed1 H\\u00e0 N\\u1ed9i\", \"province_type\": \"Th\\u00e0nh ph\\u1ed1 Trung \\u01b0\\u01a1ng\"}', '{\"district_id\": \"272\", \"district_name\": \"Huy\\u1ec7n Ph\\u00fac Th\\u1ecd\", \"district_type\": \"Huy\\u1ec7n\", \"lat\": null, \"lng\": null, \"province_id\": \"01\"}', '{\"district_id\": \"272\", \"ward_id\": \"09733\", \"ward_name\": \"X\\u00e3 Sen Chi\\u1ec3u\", \"ward_type\": \"X\\u00e3\"}'),
(5, 'Bùi Chí', 'minh', 'minh@gmail.com', 'scrypt:32768:8:1$9dNPw4Z63ZzEg0SM$1b42e44101d10360aa8ca6fedfe53db2dff65190bdc223de620d12931d9dbb0735f35d36446bfb0eff15c152b135e63d6d0e5485ee9ace87f7e352e52b82608c', 'CUSTOMER', NULL, NULL, NULL, '{\"province_id\": -1}', '{\"district_id\": -1}', '{\"ward_id\": -1}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_brand`
--
ALTER TABLE `tb_brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `tb_cart`
--
ALTER TABLE `tb_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tb_favorite`
--
ALTER TABLE `tb_favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tb_order`
--
ALTER TABLE `tb_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tb_order_detail`
--
ALTER TABLE `tb_order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `tb_order_status`
--
ALTER TABLE `tb_order_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status` (`status`);

--
-- Indexes for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `shoe_type_id` (`shoe_type_id`);

--
-- Indexes for table `tb_product_image`
--
ALTER TABLE `tb_product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `tb_product_size`
--
ALTER TABLE `tb_product_size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `tb_review`
--
ALTER TABLE `tb_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tb_shoe_type`
--
ALTER TABLE `tb_shoe_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `tb_slider`
--
ALTER TABLE `tb_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_brand`
--
ALTER TABLE `tb_brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_cart`
--
ALTER TABLE `tb_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_favorite`
--
ALTER TABLE `tb_favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tb_order`
--
ALTER TABLE `tb_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_order_detail`
--
ALTER TABLE `tb_order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_order_status`
--
ALTER TABLE `tb_order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_product`
--
ALTER TABLE `tb_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tb_product_image`
--
ALTER TABLE `tb_product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `tb_product_size`
--
ALTER TABLE `tb_product_size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `tb_review`
--
ALTER TABLE `tb_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_shoe_type`
--
ALTER TABLE `tb_shoe_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_slider`
--
ALTER TABLE `tb_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_cart`
--
ALTER TABLE `tb_cart`
  ADD CONSTRAINT `tb_cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tb_product` (`id`),
  ADD CONSTRAINT `tb_cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_favorite`
--
ALTER TABLE `tb_favorite`
  ADD CONSTRAINT `tb_favorite_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tb_product` (`id`),
  ADD CONSTRAINT `tb_favorite_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_order`
--
ALTER TABLE `tb_order`
  ADD CONSTRAINT `tb_order_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `tb_order_status` (`id`),
  ADD CONSTRAINT `tb_order_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_order_detail`
--
ALTER TABLE `tb_order_detail`
  ADD CONSTRAINT `tb_order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tb_order` (`id`),
  ADD CONSTRAINT `tb_order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `tb_product` (`id`);

--
-- Constraints for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD CONSTRAINT `tb_product_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `tb_brand` (`id`),
  ADD CONSTRAINT `tb_product_ibfk_2` FOREIGN KEY (`shoe_type_id`) REFERENCES `tb_shoe_type` (`id`);

--
-- Constraints for table `tb_product_image`
--
ALTER TABLE `tb_product_image`
  ADD CONSTRAINT `tb_product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tb_product` (`id`);

--
-- Constraints for table `tb_product_size`
--
ALTER TABLE `tb_product_size`
  ADD CONSTRAINT `tb_product_size_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tb_product` (`id`);

--
-- Constraints for table `tb_review`
--
ALTER TABLE `tb_review`
  ADD CONSTRAINT `tb_review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tb_product` (`id`),
  ADD CONSTRAINT `tb_review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_shoe_type`
--
ALTER TABLE `tb_shoe_type`
  ADD CONSTRAINT `tb_shoe_type_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `tb_brand` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
