-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2025 a las 21:57:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `putumayostay`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Estándar'),
(2, 'Doble'),
(3, 'Suite'),
(4, 'Suite Jr'),
(5, 'Familiar'),
(6, 'Penthouse');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `foto` varchar(250) NOT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id`, `nombre`, `descripcion`, `telefono`, `correo`, `foto`, `rol`) VALUES
(1, 'NEONWAAC STAYS', 'Cadena de hoteles muy buena, la mejor calidad, calidosos, insanos', '3123903681', 'jomaparo3103@gmail.com', 'http://localhost:8077/uploads/images/1740631505817-369370301imagen_2025-02-26_234441129.png', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `capacidad` int(11) NOT NULL,
  `precio` varchar(20) NOT NULL,
  `foto` varchar(250) NOT NULL,
  `categoria` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_empresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`id`, `nombre`, `descripcion`, `capacidad`, `precio`, `foto`, `categoria`, `estado`, `timestamp`, `id_empresa`) VALUES
(1, 'Refugio Andino', 'Habitación acogedora con detalles rústicos, chimenea de piedra, balcón con vista a la montaña y un ambiente cálido ideal para descansar.', 2, '220.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413263/images/mfvqmnkj3e5bmjzdlzzi.jpg', 1, 1, '2025-03-19 19:43:07', 1),
(4, 'Brisa Marina', 'Espaciosa habitación con ventanales panorámicos, balcón privado, decoración inspirada en el océano y una brisa refrescante junto al mar.', 2, '350.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413256/images/s3zdqfynmortk3zju4ju.png', 2, 1, '2025-03-19 20:05:07', 1),
(5, 'Suite Aurora Dorada', 'Elegante suite con jacuzzi privado, iluminación cálida, ventanales amplios, cama king size y una sala con muebles de lujo cómodos.', 2, '500.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413256/images/n8u7pedfc5hu3pobyjwq.png', 3, 1, '2025-03-19 21:43:10', 1),
(7, 'Hogar Familiar Encantado', 'Amplia habitación con sala de estar, comedor, terraza privada, literas y una decoración vibrante, perfecta para grupos o familias grandes.', 5, '750.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413256/images/t4x2hxetrhtqtdlurm2v.png', 5, 1, '2025-03-19 21:43:50', 1),
(8, 'Cielo Infinito Penthouse', 'Lujoso penthouse con jacuzzi en la terraza, sala panorámica, cocina equipada, vista 360° de la ciudad y servicio premium exclusivo.', 4, '1.800.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413257/images/btzoz9lvrrtz7sjb9rjf.png', 6, 1, '2025-03-19 21:44:44', 1),
(9, 'Refugio del Bosque', 'Acogedora habitación con vista al bosque, chimenea de leña, balcón privado y decoración rústica inspirada en la naturaleza.', 2, '200.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413256/images/tffwryt1ehnann5uqdw1.png', 1, 1, '2025-03-19 21:45:13', 1),
(10, 'Brisa del Caribe', 'Espaciosa habitación con balcón privado, vista al mar, decoración tropical y una brisa refrescante que invita al relax.', 2, '320.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413256/images/vyvszv11ttm1joqvozsh.png', 2, 1, '2025-03-19 21:45:31', 1),
(11, 'Suite Luna Plateada', 'Elegante suite con jacuzzi privado, iluminación tenue, cama king size y una sala de estar con muebles de diseño moderno.', 2, '480.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413257/images/z7uls6zuscs1wyaza9k9.png', 3, 1, '2025-03-19 21:45:57', 1),
(13, 'Mirador Estelar Penthouse', 'Lujoso penthouse con terraza, jacuzzi, sala panorámica, cocina equipada y vista espectacular de la ciudad y las estrellas.', 4, '1.750.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413259/images/tdrjmwg4ld716zkpbwkb.png', 6, 1, '2025-03-19 21:47:46', 1),
(14, 'Cabaña del Lago', 'Habitación con vista al lago, chimenea de piedra, balcón privado y decoración campestre que evoca tranquilidad y paz.', 2, '230.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413258/images/dudzejcbrorujujjdmvf.png', 1, 1, '2025-03-19 21:48:28', 1),
(15, 'Olas del Pacífico', 'Habitación con balcón privado, vista al océano, decoración marina y sonido relajante de las olas que rompen en la orilla.', 2, '340.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413258/images/se0rea8yjmaqh164iiei.png', 2, 1, '2025-03-19 21:48:57', 1),
(16, 'Suite Sol Naciente', 'Suite con sala de estar, jacuzzi privado, iluminación cálida y vista privilegiada al amanecer sobre las montañas.', 2, '490.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413259/images/zelmxjmlarxzyzbexkwc.png', 4, 1, '2025-03-19 21:49:23', 1),
(17, 'Hogar Dulce Hogar', 'Habitación familiar con cocina pequeña, área de juegos, terraza privada y decoración acogedora para disfrutar en familia.', 5, '720.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413259/images/spftnfn4tmxbigjbtl12.png', 5, 1, '2025-03-19 21:50:04', 1),
(18, 'Cielo Nocturno Penthouse', 'Penthouse con terraza, bar privado, jacuzzi y vista panorámica de la ciudad iluminada bajo el cielo estrellado.', 4, '2.400.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413259/images/iagmmijdo1yzxhstlpnl.png', 1, 1, '2025-03-19 21:50:29', 1),
(19, 'Refugio Montañés', 'Habitación con chimenea de leña, balcón privado, vista a las montañas y decoración rústica que invita al descanso.', 2, '210.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413262/images/mdrzyg8dscrnms1ldhzd.png', 1, 1, '2025-03-19 21:50:57', 1),
(20, 'Brisa Tropical', 'Habitación con balcón privado, hamaca, decoración caribeña y una brisa suave que transporta al paraíso tropical.', 2, '330.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413259/images/kjgsll23sevuunpfbz5h.png', 2, 1, '2025-03-19 21:51:10', 1),
(21, 'Suite Estrella Fugaz', 'Suite con jacuzzi privado, iluminación LED ajustable, cama king size y detalles modernos que brindan confort y lujo.', 1, '470.000COP', 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413259/images/mteikv0ws5j2c5onb6k6.png', 4, 1, '2025-03-19 21:51:45', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_pagos`
--

CREATE TABLE `historial_pagos` (
  `id` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `monto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blockchain`
--

CREATE TABLE `blockchain` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `data` text NOT NULL,
  `hash` varchar(128) NOT NULL,
  `previous_hash` varchar(128) NOT NULL,
  `nonce` int(11) NOT NULL,
  `id_reserva` int(11) DEFAULT NULL,
  `id_pago` int(11) DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_reservas`
--

CREATE TABLE `historial_reservas` (
  `id` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `monto` varchar(50) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` tinyint(1) DEFAULT 1,
  `id_usuario` int(11) NOT NULL,
  `id_habitacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `monto`, `fecha_ingreso`, `fecha_salida`, `timestamp`, `estado`, `id_usuario`, `id_habitacion`) VALUES
(9, '$ 500.000COP', '2025-03-19', '2025-03-20', '2025-03-19 22:01:41', 1, 43, 5),
(10, '$ 210.000COP', '2025-03-19', '2025-03-20', '2025-03-20 01:25:15', 1, 36, 19),
(11, '$ 5.880.000COP', '2025-04-04', '2025-05-02', '2025-04-23 20:02:03', 1, 36, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_usuario` int(11) NOT NULL,
  `id_habitacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id`, `valor`, `descripcion`, `timestamp`, `id_usuario`, `id_habitacion`) VALUES
(1, 3, 'Lorem ipsum 200000 cosas mas para que el texto llegue a tener 2 lineas porque si no quedaría mal centrado las estrellas', '2025-03-05 04:41:24', 36, 13),
(2, 4, 'La habitación era espaciosa, limpia y bien iluminada. La cama cómoda y el baño impecable. La vista espectacular. Sin embargo, el WiFi era lento. En general, una estancia agradable y relajante.', '2025-03-05 15:26:07', 36, 1),
(3, 5, 'La habitación tenía un diseño moderno y acogedor. La cama era muy cómoda, y la limpieza impecable. Buenas amenidades, pero el aire acondicionado era ruidoso. Aun así, una excelente experiencia.', '2025-03-05 15:26:48', 36, 1),
(4, 5, 'Hola me gusto mucho la página, pero estará funcionando la chanda de comentarios?', '2025-03-06 02:46:00', 36, 1),
(5, 1, 'Rellleno para probar los botoneeesssssss', '2025-03-06 03:23:14', 36, 1),
(6, 1, 'asdasdsadsadsadsadsadasdsadsadsa', '2025-03-06 03:23:19', 36, 1),
(7, 5, 'sadasdasdasdasdsadasdasdas', '2025-03-06 03:28:01', 38, 4),
(8, 4, 'Me gusto la habitación voy a estar probando más seguido la aplicación para encontrar fallas, pero por el momento ninguna', '2025-03-06 04:00:30', 38, 4),
(9, 1, 'Hola nueva reseña papu papu pro', '2025-03-06 04:01:21', 38, 4),
(10, 4, 'Me gustó la habitación muy bonita, pero tenía un problema en el baño, la puerta no cerraba bien', '2025-03-10 01:13:59', 38, 5),
(11, 4, 'Papu asdasdsadsadsadsaa', '2025-03-10 19:11:47', 36, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'usuario'),
(2, 'administrador'),
(3, 'empresa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `nombres` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `edad` date DEFAULT NULL,
  `rol` int(11) NOT NULL DEFAULT 1,
  `foto` varchar(250) DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `correo`, `password`, `nombres`, `apellidos`, `edad`, `rol`, `foto`, `token`, `timestamp`, `telefono`) VALUES
(1, 'empresahotelera1', 'euwvillain2nw@gmail.com', '$2b$10$epudyc5n05.KpJrZtCMjauICvtEzSjshA6KOF2l4zKUnAD7R10c7e', NULL, NULL, NULL, 3, 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413260/images/vrkozwgtflfzatfa2vaz.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbXByZXNhaG90ZWxlcmExIiwicm9sIjozLCJpYXQiOjE3NDIyMjYyNDYsImV4cCI6MTc0MjIyOTg0Nn0.dmqTKwCIW5D8USlhaNNZVBzN75h-H1AknUySAPjJzCY', '2025-03-19 21:53:33', '3123903681'),
(36, 'neonwaac', 'jomaparo3103@gmail.com', '$2b$10$f2ATW/Qn9SQrs.CetVv1e.CGPPcJxe378MrJ3nRaCUbn.m0PTYztS', NULL, NULL, NULL, 2, 'https://res.cloudinary.com/do7ofswf2/image/upload/v1742413260/images/v4ugfe7cvikcq7ssod5r.jpg', NULL, '2025-04-23 20:02:29', ''),
(37, 'aaa', 'aa@aaa', '$2b$10$4COIAUZ2bN1eUwoeWoQrzuarGjDqFGq4HgwbqWW0/QLwTWEtVEdem', NULL, NULL, NULL, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsInVzZXJuYW1lIjoiYWFhIiwicm9sIjoiJDJiJDEwJDRDT0lBVVoyYk4xZVV3b2VXb1FyenVhckdqRHFGR3E0SGd3YnFXVzAvUUx3VFdFdFZFZGVtIiwiaWF0IjoxNzQwNTgxNDgxLCJleHAiOjE3NDA1ODUwODF9.1fP7-S2BGwh5DjuLsNfQu4NPVrGmIR3mNjwZFHaq', '2025-02-26 14:51:21', ''),
(38, 'nikotpuwuw', 'euwvillain2nw@gmail.com', '$2b$10$iHCLxNpTdzbzM93AwvFs2uFTtGCCNyaVcyiHO.CRSB.STImB8LcDe', NULL, NULL, NULL, 3, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsInVzZXJuYW1lIjoibmlrb3RwdXd1dyIsInJvbCI6MywiaWF0IjoxNzQyNDIxNDA1LCJleHAiOjE3NDI0MjUwMDV9.3xgQjBrFFYel-sBZFs0sqpOyGDDrolCZ-v3940mE-rc', '2025-03-19 21:56:45', ''),
(43, 'Jose Pantoja', 'josemanuelpantoja31@gmail.com', '$2b$10$rZGWKFuPBu2Z7Co874N/F.ewCo7snf9xZQiIu6ArIEjnhzI4a0Pve', NULL, NULL, NULL, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsInVzZXJuYW1lIjoiSm9zZSBQYW50b2phIiwicm9sIjoxLCJpYXQiOjE3NDI0MjE2NjcsImV4cCI6MTc0MjQyNTI2N30.PWhR9nk2OAC1xtiwD4hcpLsPMyoSvJWRT6nMfzkAdqo', '2025-03-19 22:01:07', ''),
(44, 'Felipe Fajardo', 'felipealekand@gmail.com', '$2b$10$/uDwjlu504tiWMWMBJalvOol5wZprdJK4Rq5YgfFujkhhj8L0cVaa', NULL, NULL, NULL, 1, 'http://localhost:8077/uploads/images/usuarios44Felipe Fajardo.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInVzZXJuYW1lIjoiRmVsaXBlIEZhamFyZG8iLCJyb2wiOjEsImlhdCI6MTc0NzI0MzIyMSwiZXhwIjoxNzQ3MjQ2ODIxfQ.oDpIt7vFjIVwEtXUr3SwC55gJWwBkc0pf6AuYzserZg', '2025-05-14 17:20:21', ''),
(45, 'felipe', 'felip@gmail.com', '$2b$10$DYboeZv5FTFYOuWDqCg6HuZ2FEO.QMMQNRigo5j4gcyfD.vhafZTm', NULL, NULL, NULL, 1, NULL, NULL, '2025-05-07 21:47:07', ''),
(46, 'Felipe Fajardo', 'felipealekand1@gmail.com', '$2b$10$3toGK3GWRIQzNt40tP8UT.iMMaO4dqQcjZPHI19wzSwzPcA.N45ii', NULL, NULL, NULL, 1, 'https://localhost:8077/uploads/images/usuarios46Felipe Fajardo.jpg', NULL, '2025-05-14 19:10:10', ''),
(47, '123', '123', '$2b$10$TG36T/Stb.hhX1K38qzpCOtjeaERL44Hh2jiC9/Bu0ixfrQbSt/0i', NULL, NULL, NULL, 1, NULL, NULL, '2025-05-09 01:59:09', ''),
(48, 'FELIPE ALEJANDRO FAJARDO CASTRO', 'fafajardo24@itp.edu.co', '$2b$10$bg5CMbZVt4yCHkCVmcV/muub1IokFMrz8IylCWnJf2n5ZHZU3PMQW', NULL, NULL, NULL, 1, 'https://localhost:8077/uploads/images/usuarios48FELIPE ALEJANDRO FAJARDO CASTRO.jpg', NULL, '2025-05-14 19:09:58', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol` (`rol`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria` (`categoria`),
  ADD KEY `estado` (`estado`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indices de la tabla `historial_pagos`
--
ALTER TABLE `historial_pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reserva` (`id_reserva`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `historial_reservas`
--
ALTER TABLE `historial_reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reserva` (`id_reserva`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_habitacion` (`id_habitacion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_habitacion` (`id_habitacion`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`correo`),
  ADD KEY `rol` (`rol`);

--
-- Indices de la tabla `blockchain`
--
ALTER TABLE `blockchain`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reserva` (`id_reserva`),
  ADD KEY `id_pago` (`id_pago`),
  ADD KEY `creator_id` (`creator_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `historial_pagos`
--
ALTER TABLE `historial_pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_reservas`
--
ALTER TABLE `historial_reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `blockchain`
--
ALTER TABLE `blockchain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD CONSTRAINT `habitaciones_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_pagos`
--
ALTER TABLE `historial_pagos`
  ADD CONSTRAINT `historial_pagos_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_pagos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_reservas`
--
ALTER TABLE `historial_reservas`
  ADD CONSTRAINT `historial_reservas_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_reservas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_habitacion`) REFERENCES `habitaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_habitacion`) REFERENCES `habitaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Filtros para la tabla `blockchain`
--
ALTER TABLE `blockchain`
  ADD CONSTRAINT `blockchain_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `blockchain_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `blockchain_ibfk_3` FOREIGN KEY (`id_pago`) REFERENCES `historial_pagos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
