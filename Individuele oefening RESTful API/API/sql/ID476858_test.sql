-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: com-linweb1038.srv.combell-ops.net:3306
-- Gegenereerd op: 04 okt 2025 om 16:49
-- Serverversie: 8.0.36-28
-- PHP-versie: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ID476858_test`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `bezoekers`
--

CREATE TABLE `bezoekers` (
  `id` int NOT NULL,
  `voornaam` varchar(100) NOT NULL,
  `familienaam` varchar(100) NOT NULL,
  `geboortedatum` date NOT NULL,
  `email` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `bezoekers`
--

INSERT INTO `bezoekers` (`id`, `voornaam`, `familienaam`, `geboortedatum`, `email`) VALUES
(1, 'Jan', 'Peeters', '1990-05-14', 'jan.peeters@email.com'),
(2, 'Sarah', 'Vermeulen', '1985-09-22', 'sarah.vermeulen@email.com'),
(3, 'Tom', 'De Smet', '1992-03-08', 'tom.desmet@email.com'),
(4, 'Lotte', 'Claes', '1998-07-01', 'lotte.claes@email.com'),
(5, 'Emma', 'Wouters', '2001-11-19', 'emma.wouters@email.com'),
(6, 'Noah', 'Jacobs', '1995-02-10', 'noah.jacobs@email.com'),
(7, 'Lisa', 'Maes', '1993-06-25', 'lisa.maes@email.com'),
(8, 'Lucas', 'Goossens', '1988-01-30', 'lucas.goossens@email.com'),
(9, 'Mila', 'De Wilde', '2000-12-12', 'mila.dewilde@email.com'),
(10, 'Finn', 'Demaertelaere', '1999-09-05', 'finn.demaertelaere@email.com'),
(11, 'Nora', 'Michiels', '1994-04-15', 'nora.michiels@email.com'),
(12, 'Arne', 'Van Damme', '1997-02-02', 'arne.vandamme@email.com'),
(13, 'Lena', 'Verbeeck', '2003-03-03', 'lena.verbeeck@email.com'),
(14, 'Ruben', 'Hermans', '1991-10-10', 'ruben.hermans@email.com'),
(15, 'Sofie', 'Vandenberghe', '1989-08-08', 'sofie.vandenberghe@email.com'),
(16, 'Kobe', 'De Vos', '1996-06-21', 'kobe.devos@email.com'),
(17, 'Tine', 'Segers', '1995-12-23', 'tine.segers@email.com'),
(18, 'Jonas', 'Willems', '1990-09-09', 'jonas.willems@email.com'),
(19, 'Eline', 'Vandendriessche', '1998-11-11', 'eline.vandendriessche@email.com'),
(20, 'Matteo', 'Lambrecht', '1993-05-05', 'matteo.lambrecht@email.com');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `concerten`
--

CREATE TABLE `concerten` (
  `id` int NOT NULL,
  `artiest` varchar(150) NOT NULL,
  `datum` date NOT NULL,
  `uur` time NOT NULL,
  `venue` varchar(150) NOT NULL,
  `kostprijs` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `concerten`
--

INSERT INTO `concerten` (`id`, `artiest`, `datum`, `uur`, `venue`, `kostprijs`) VALUES
(1, 'Coldplay', '2025-07-15', '20:00:00', 'Sportpaleis Antwerpen', 85.00),
(2, 'Ed Sheeran', '2025-08-01', '19:30:00', 'Ziggo Dome Amsterdam', 95.00),
(3, 'Imagine Dragons', '2025-09-10', '21:00:00', 'Forest National Brussel', 80.00),
(4, 'Dua Lipa', '2025-07-25', '20:30:00', 'Ahoy Rotterdam', 90.00),
(5, 'The Weeknd', '2025-06-20', '21:00:00', 'Stade de France Parijs', 120.00),
(6, 'Arctic Monkeys', '2025-09-05', '20:00:00', 'Sportpaleis Antwerpen', 75.00),
(7, 'Billie Eilish', '2025-08-14', '19:00:00', 'Ziggo Dome Amsterdam', 110.00),
(8, 'Muse', '2025-10-02', '20:45:00', 'Paleis 12 Brussel', 95.00),
(9, 'Harry Styles', '2025-07-30', '20:00:00', 'O2 Arena Londen', 125.00),
(10, 'Taylor Swift', '2025-06-28', '19:30:00', 'Wembley Stadium Londen', 150.00);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tickets`
--

CREATE TABLE `tickets` (
  `id` int NOT NULL,
  `bezoeker_id` int NOT NULL,
  `concert_id` int NOT NULL,
  `aankoop_datum` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `tickets`
--

INSERT INTO `tickets` (`id`, `bezoeker_id`, `concert_id`, `aankoop_datum`) VALUES
(1, 1, 1, '2025-10-04 14:44:05'),
(2, 1, 2, '2025-10-04 14:44:05'),
(3, 2, 1, '2025-10-04 14:44:05'),
(4, 2, 5, '2025-10-04 14:44:05'),
(5, 3, 3, '2025-10-04 14:44:05'),
(6, 3, 4, '2025-10-04 14:44:05'),
(7, 4, 2, '2025-10-04 14:44:05'),
(8, 4, 7, '2025-10-04 14:44:05'),
(9, 5, 5, '2025-10-04 14:44:05'),
(10, 5, 10, '2025-10-04 14:44:05'),
(11, 6, 1, '2025-10-04 14:44:05'),
(12, 6, 8, '2025-10-04 14:44:05'),
(13, 7, 6, '2025-10-04 14:44:05'),
(14, 7, 9, '2025-10-04 14:44:05'),
(15, 8, 2, '2025-10-04 14:44:05'),
(16, 8, 3, '2025-10-04 14:44:05'),
(17, 9, 9, '2025-10-04 14:44:05'),
(18, 10, 4, '2025-10-04 14:44:05'),
(19, 10, 6, '2025-10-04 14:44:05'),
(20, 11, 8, '2025-10-04 14:44:05'),
(21, 12, 10, '2025-10-04 14:44:05'),
(22, 13, 3, '2025-10-04 14:44:05'),
(23, 13, 5, '2025-10-04 14:44:05'),
(24, 14, 1, '2025-10-04 14:44:05'),
(25, 14, 7, '2025-10-04 14:44:05'),
(26, 15, 2, '2025-10-04 14:44:05'),
(27, 15, 9, '2025-10-04 14:44:05'),
(28, 16, 4, '2025-10-04 14:44:05'),
(29, 16, 8, '2025-10-04 14:44:05'),
(30, 17, 5, '2025-10-04 14:44:05'),
(31, 17, 10, '2025-10-04 14:44:05'),
(32, 18, 1, '2025-10-04 14:44:05'),
(33, 18, 6, '2025-10-04 14:44:05'),
(34, 19, 3, '2025-10-04 14:44:05'),
(35, 19, 9, '2025-10-04 14:44:05'),
(36, 20, 2, '2025-10-04 14:44:05'),
(37, 20, 8, '2025-10-04 14:44:05');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `bezoekers`
--
ALTER TABLE `bezoekers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexen voor tabel `concerten`
--
ALTER TABLE `concerten`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bezoeker_id` (`bezoeker_id`,`concert_id`),
  ADD KEY `concert_id` (`concert_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `bezoekers`
--
ALTER TABLE `bezoekers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT voor een tabel `concerten`
--
ALTER TABLE `concerten`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT voor een tabel `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`bezoeker_id`) REFERENCES `bezoekers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`concert_id`) REFERENCES `concerten` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
