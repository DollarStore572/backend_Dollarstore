CREATE DATABASE dollarstore_ACT;
USE dollarstore_ACT;

-- Tabla Clientes
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    telefono VARCHAR(12),
    cedula VARCHAR(16)
);


-- Tabla Productos3

CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto varchar(100),
    descripcion VARCHAR(250),
    precio_unitario DOUBLE,
    existencia INT,
    id_marca INT,
    id_categoria INT,
    calificacion TINYINT
);

-- Tabla Ventas
CREATE TABLE Ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha datetime
);

-- Tabla Detalles_Ventas
CREATE TABLE Detalles_Ventas (
    id_detalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    cantidad INT,
    precio_ventas FLOAT
);


-- Tabla Compras
CREATE TABLE Compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT,
   fecha datetime
);

-- Tabla Detalles_Compras
CREATE TABLE Detalles_Compras (
    id_detalle_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_compra INT,
    cantidad INT,
    precio_compras FLOAT
);

-- Tabla Marca
CREATE TABLE Marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(15)
);

-- Tabla Categoria
CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50),
    descripcion varchar(200)
);

-- Tabla Proveedor
CREATE TABLE Proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    compania VARCHAR(15),
    telefono VARCHAR(10),
    correo_electronico VARCHAR(25)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(20),
    contraseña VARCHAR(20)
);

-- Inserciones iniciales
INSERT INTO Usuarios (usuario, contraseña) VALUES
('edgaradm', 'ejm123'),
('tavoadm', 'gjdc123'),
('user3', 'user456');

INSERT INTO Clientes (nombre, apellido, telefono, cedula) VALUES
('Modric', 'Valverde', '1234567890', '2233-4455-66'),
('Ana', 'Gonzalez', '9876543210', '5566-7788-99'),
('Luis', 'Hernandez', '1122334455', '1122-3344-55'),
('Maria', 'Lopez', '2233445566', '9876-5432-10'),
('Carlos', 'Martinez', '3344556677', '1234-5678-90'),
('Javier', 'Torres', '4567891230', '3344-5566-77'),
('Sofía', 'Ruiz', '7890123456', '4455-6677-88'),
('Diego', 'Pérez', '3216549870', '5566-7788-00'),
('Valentina', 'Castro', '6543210987', '6677-8899-11'),
('Andrés', 'Gómez', '8901234567', '7788-9900-22'),
('Isabella', 'Méndez', '1357924680', '8899-0011-33'),
('Fernando', 'Silva', '2468135790', '9900-1122-44'),
('Camila', 'Ortega', '9876543211', '0011-2233-55'),
('Alejandro', 'Rojas', '1029384756', '1122-3344-66'),
('Natalia', 'Jiménez', '5647382910', '2233-4455-77'),
('Sebastián', 'Morales', '3214567890', '3344-5566-88'),
('Lucía', 'Herrera', '7893216540', '4455-6677-99'),
('Emilio', 'Vargas', '6549873210', '5566-7788-11'),
('Valeria', 'Paredes', '5678901234', '6677-8899-22'),
('Mateo', 'Castillo', '5678901238', '7788-9900-33');

INSERT INTO Proveedores (compania, telefono, correo_electronico) VALUES
('TOMMY', '84562315', 'tommyinfo1@gmail.com'),
('Nike', '12345678', 'nikeinfo@gmail.com'),
('Adidas', '87654321', 'adidasinfo@gmail.com'),
('Puma', '23456789', 'pumainfo@gmail.com'),
('Reebok', '34567890', 'reebokinfo@gmail.com');

INSERT INTO Categorias (nombre_categoria, descripcion) VALUES
('Ropa de vestir', 'Ropa formal y casual para eventos.'),
('Calzado', 'Zapatos y botas para diversas ocasiones.'),
('Accesorios', 'Complementos como bolsos, relojes y cinturones.'),
('Ropa de abrigo', 'Chaquetas y chalecos para climas fríos.'),
('Ropa deportiva', 'Ropa diseñada para actividades físicas.'),
('Artículos de viaje', 'Maletas y accesorios para viajes.'),
('Ropa interior', 'Prendas interiores de algodón y otros materiales.'),
('Ropa de baño', 'Trajes de baño para playa y piscina.');

INSERT INTO Marcas (nombre_marca) VALUES
('Hugo Boss'),
('Zara'),
('Clarks'),
('Seiko'),
('Michael Kors'),
('AllSaints'),
('Nike'),
('Ray-Ban'),
('Levi''s'),
('Adidas'),
('Uniqlo'),
('H&M'),
('Caterpillar'),
('Samsonite'),
('Calvin Klein'),
('Tommy Hilfiger'),
('ASOS'),
('North Face'),
('Burberry'),
('Speedo');

INSERT INTO Productos (nombre_producto, descripcion, precio_unitario, existencia, id_marca, id_categoria, calificacion) VALUES
('Camisa de Vestir Blanca', 'Camisa de algodón, corte slim fit.', 92.03, 4, 1, 1, 4),
('Pantalón de Vestir Negro', 'Pantalón de lana, corte recto.', 211.66, 3, 2, 1, 3),
('Zapatos de Cuero Marrones', 'Zapatos de cuero, diseño clásico.', 375.46, 5, 3, 2, 5),
('Reloj Analógico de Acero', 'Reloj de acero, esfera negra.', 588.62, 7, 4, 3, 2),
('Bolso de Cuero Marrón', 'Bolso de cuero sintético, diseño minimalista.', 309.20, 9, 5, 3, 4),
('Chaqueta de Cuero', 'Chaqueta de cuero, diseño clásico.', 820.86, 11, 6, 4, 1),
('Zapatillas Deportivas', 'Zapatillas ligeras y transpirables.', 134.36, 13, 7, 5, 3),
('Gafas de Sol', 'Gafas de sol con protección UV.', 655.22, 15, 8, 3, 5),
('Cinturón de Cuero', 'Cinturón de cuero, hebilla metálica.', 1102.52, 17, 9, 3, 4),
('Sudadera con Capucha', 'Sudadera de algodón con capucha.', 230.06, 19, 10, 5, 2),
('Camiseta Básica', 'Camiseta de algodón, corte clásico.', 445.40, 21, 11, 1, 5),
('Pantalones Cortos', 'Pantalones cortos de algodón.', 1306.76, 23, 12, 1, 3),
('Botas de Trabajo', 'Botas de trabajo resistentes.', 183.68, 25, 13, 2, 4),
('Maleta de Viaje', 'Maleta de viaje con ruedas.', 726.98, 27, 14, 6, 2),
('Ropa Interior', 'Ropa interior de algodón.', 1010.43, 29, 15, 7, 5),
('Camisa de Rayas', 'Camisa de rayas, corte regular.', 342.33, 31, 16, 1, 1),
('Falda Larga', 'Falda larga con estampado floral.', 537.43, 33, 17, 1, 3),
('Chaleco Térmico', 'Chaleco acolchado y cálido.', 1222.29, 35, 18, 4, 4),
('Bufanda de Lana', 'Bufanda de lana, diseño clásico.', 288.96, 37, 19, 3, 5),
('Traje de Baño', 'Traje de baño de una pieza.', 12425.16, 39, 20, 8, 2);



INSERT INTO Ventas (id_cliente, fecha) VALUES
(1, '2025-05-07 12:00:00'),
(2, '2025-05-06 14:30:00'),
(3, '2025-05-05 16:45:00'),
(4, '2025-05-04 10:15:00'),
(5, '2025-05-03 18:00:00'),
(6, '2025-05-02 12:20:00'),
(7, '2025-05-01 08:05:00'),
(8, '2025-04-30 21:55:00'),
(9, '2025-04-29 17:40:00'),
(10, '2025-04-28 09:25:00'),
(11, '2025-04-27 15:10:00'),
(12, '2025-04-26 20:30:00'),
(13, '2025-04-25 11:45:00'),
(14, '2025-04-24 22:15:00'),
(15, '2025-04-23 13:05:00'),
(16, '2025-04-22 19:50:00'),
(17, '2025-04-21 16:10:00'),
(18, '2025-04-20 07:45:00'),
(19, '2025-04-19 23:30:00'),
(20, '2025-04-18 14:00:00');



INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_ventas) VALUES
(1, 1, 3, 276.08),
(2, 2, 2, 423.32),
(3, 3, 4, 1877.31),
(4, 4, 5, 588.62),
(5, 5, 1, 618.41),
(6, 6, 2, 2462.59),
(7, 7, 3, 268.71),
(8, 8, 5, 2620.87),
(9, 9, 2, 1102.52),
(10, 10, 4, 690.19),
(11, 11, 1, 890.80),
(12, 12, 3, 3920.27),
(13, 13, 1, 734.73),
(14, 14, 2, 1454.00),
(15, 15, 3, 1010.43),
(16, 16, 4, 1369.33),
(17, 17, 2, 1612.28),
(18, 18, 3, 2444.18),
(19, 19, 1, 1444.79),
(20, 20, 4, 1425.16);


INSERT INTO Compras (id_proveedor, fecha) VALUES
(5, '2025-05-07 12:00:00'),
(4, '2025-05-06 14:30:00'),
(3, '2025-05-05 16:45:00'),
(2, '2025-05-04 10:15:00'),
(1, '2025-05-03 18:00:00');


INSERT INTO Detalles_compras (id_producto, id_compra, cantidad, precio_compras) VALUES
(1, 1, 100, 300),
(2, 2, 50, 10),
(3, 3, 200, 10.50),
(4, 4, 150, 15.00),
(5, 5, 30, 500.00);


-- Consultas de verificación
SELECT * FROM Categorias;
SELECT * FROM Proveedores;
SELECT * FROM Usuarios;
SELECT * FROM Productos;
SELECT * FROM Ventas;
SELECT * FROM Detalles_Ventas;
SELECT * FROM Compras;
SELECT * FROM Detalles_Compras;
SELECT * FROM Clientes;


SELECT 
    v.id_venta,
    v.fecha,
    CONCAT(c.nombre, ' ', c.apellido) AS nombre_cliente,
    p.descripcion AS nombre_producto,
    dv.cantidad,
    dv.precio_ventas AS precio_unitario,
    (dv.cantidad * dv.precio_ventas) AS subtotal
FROM Ventas v
INNER JOIN Clientes c ON v.id_cliente = c.id_cliente
INNER JOIN Detalles_Ventas dv ON v.id_venta = dv.id_venta
INNER JOIN Productos p ON dv.id_producto = p.id_producto;

	SELECT 
        id_compra,
        id_proveedor,
        fecha
      FROM Compras
      WHERE id_compra = 1;
      
       SELECT 
          c.id_compra,
          dc.id_detalle_compra,
          c.fecha,
          CONCAT(pr.compania) AS nombre_compania,
          p.nombre_producto,
          dc.cantidad,
          dc.precio_compras,
          (dc.cantidad * dc.precio_compras) AS subtotal
        FROM Compras c
        INNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor
        INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
        INNER JOIN Productos p ON dc.id_producto = p.id_producto;



SELECT 
    c.id_compra,
    c.fecha,
   CONCAT(compania) AS nombre_compania,
    p.descripcion AS nombre_producto,
    dc.cantidad,
    dc.precio_compras AS precio_unitario,
    (dc.cantidad * dc.precio_compras) AS subtotal
FROM Compras c
INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
INNER JOIN Productos p ON dc.id_producto = p.id_producto
iNNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor;


 SELECT 
        c.id_compra,
        c.fecha,
        CONCAT(pr.compania) AS nombre_compania,
        SUM(dc.cantidad * dc.precio_compras) AS total_venta
      FROM Compras c
      INNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor
      INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
      GROUP BY c.id_compra, c.fecha, pr.compania, dc.precio_compras;


-- Relación entre Clientes y Ventas
ALTER TABLE Ventas
ADD CONSTRAINT fk_cliente
FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente);

-- Relación entre Ventas y Detalles_Ventas
ALTER TABLE Detalles_Ventas
ADD CONSTRAINT fk_venta
FOREIGN KEY (id_venta) REFERENCES Ventas(id_venta);

-- Relación entre Detalles_Ventas y Productos
ALTER TABLE Detalles_Ventas
ADD CONSTRAINT fk_producto
FOREIGN KEY (id_producto) REFERENCES Productos(id_producto);

-- Relación entre Productos y Marca
ALTER TABLE Productos
ADD CONSTRAINT fk_marcas
FOREIGN KEY (id_marca) REFERENCES Marcas(id_marca);

-- Relación entre Productos y Categoría
ALTER TABLE Productos
ADD CONSTRAINT fk_categorias
FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria);

-- Relación entre Compras y Detalles_Compras
ALTER TABLE Detalles_Compras
ADD CONSTRAINT fk_compra
FOREIGN KEY (id_compra) REFERENCES Compras(id_compra);

-- Relación entre Compras y Proveedores
ALTER TABLE Compras
ADD CONSTRAINT fk_proveedores
FOREIGN KEY (id_proveedor) REFERENCES Proveedores(id_proveedor);

ALTER TABLE detalles_compras
ADD CONSTRAINT fk_productos
FOREIGN KEY (id_producto) REFERENCES productos(id_producto);

