CREATE DATABASE dollarstore_ACT;
USE dollarstore_ACT;

-- Tabla Clientes
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    telefono VARCHAR(12),
    direccion VARCHAR(50)
);



-- Tabla Productos
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(30),
    cantidad INT,
    precio_unitario DOUBLE,
    existencia INT,
    id_marca INT,
    id_categoria INT,
    calificacion TINYINT
);

-- Tabla Ventas
CREATE TABLE Ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT
);

-- Tabla Detalles_Ventas
CREATE TABLE Detalles_Ventas (
    id_detalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    cantidad INT,
    precio_detalle FLOAT
);


-- Tabla tiempo 
Create table Tiempo(
id_tiempo int auto_increment primary key,
fecha Date,
mes varchar(10),
año int);



-- Tabla Compras
CREATE TABLE Compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT
);

-- Tabla Detalles_Compras
CREATE TABLE Detalles_Compras (
    id_detalle_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_compra INT,
    cantidad INT,
    precio FLOAT
);

-- Tabla Marca
CREATE TABLE Marca (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(15)
);

-- Tabla Categoria
CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(20)
);

-- Tabla Proveedor
CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    compania VARCHAR(15),
    telefono VARCHAR(10),
    correo_electronico VARCHAR(25)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    usuario VARCHAR(20) PRIMARY KEY,
    contraseña VARCHAR(20)
);

-- Inserciones iniciales
INSERT INTO Usuarios (usuario, contraseña) VALUES
('dollar', 'dollarpass'),
('admin1', 'admin124'),
('user2', 'user456');

INSERT INTO clientes (nombre, apellido, telefono, direccion) VALUES
('Modric', 'Valverde', '1234567890', 'Calle Falsa 123'),
('Ana', 'Gonzalez', '0987654321', 'Avenida Siempreviva 742'),
('Luis', 'Hernandez', '1122334455', 'Calle del Sol 456'),
('Maria', 'Lopez', '2233445566', 'Calle Luna 789'),
('Carlos', 'Martinez', '3344556677', 'Calle Estrella 321');

INSERT INTO proveedor (compania, telefono, correo_electronico) VALUES
('TOMMY', '84562315', 'tommyinfo1@gmail.com'),
('Nike', '12345678', 'nikeinfo@gmail.com'),
('Adidas', '87654321', 'adidasinfo@gmail.com'),
('Puma', '23456789', 'pumainfo@gmail.com'),
('Reebok', '34567890', 'reebokinfo@gmail.com');

INSERT INTO categoria (descripcion) VALUES
('Cosas para el hogar'),
('Electrónica'),
('Ropa'),
('Alimentos'),
('Muebles');

INSERT INTO marca (nombre_marca) VALUES
('Marca1'),
('Marca2'),
('Marca3'),
('Marca4'),
('Marca5');

INSERT INTO productos (descripcion, cantidad, precio_unitario, existencia, id_marca, id_categoria) VALUES
('Reloj de pared', 1, 562, 2, 1, 1),
('Auriculares Sony', 5, 349.99, 10, 2, 2),
('Camiseta Nike', 20, 29.99, 50, 3, 3),
('Arroz', 100, 20.50, 200, 4, 4),
('Sofa', 10, 999.99, 15, 5, 5);


INSERT INTO ventas (id_cliente, id_tiempo) VALUES
(1, 1),
(2, 2),
(3, 4),
(4, 5),
(5, 3);

INSERT INTO Tiempo (fecha, mes, año) VALUES
('2025-01-01', 'Enero', 2025),
('2025-02-01', 'Febrero', 2025),
('2025-03-01', 'Marzo', 2025),
('2025-04-01', 'Abril', 2025),
('2025-05-01', 'Mayo', 2025);



INSERT INTO detalles_ventas (cantidad, precio_detalle, id_venta, id_producto) VALUES
(2, 15.00, 1, 1),
(1, 20.00, 1, 2),
(3, 10.00, 2, 1),
(4, 5.00, 2, 2),
(1, 30.00, 3, 3);


INSERT INTO compras (id_proveedor, id_tiempo) VALUES
(5, 1),
(4, 2),
(3, 3),
(2, 4),
(1, 5);


INSERT INTO detalles_compras (id_producto, id_compra, cantidad, precio) VALUES
(1, 1, 100, 300),
(2, 2, 50, 10),
(3, 3, 200, 10.50),
(4, 4, 150, 15.00),
(5, 5, 30, 500.00);


-- Consultas de verificación
SELECT * FROM Clientes;
SELECT * FROM Usuarios;
SELECT * FROM Productos;
SELECT * FROM Ventas;
SELECT * FROM Detalles_Ventas;
SELECT * FROM Compras;
SELECT * FROM Detalles_Compras;

-- Actualizar un cliente
UPDATE Clientes
SET telefono = '99999999', direccion = 'Nueva Avenida'
WHERE id_cliente = 1;

-- Actualizar un producto
UPDATE Productos
SET precio_unitario = 299.99, cantidad = 50
WHERE id_producto = 1;


-- Actualizar un detalle de venta
UPDATE Detalles_Ventas
SET cantidad = 25, precio_detalle = 349.99
WHERE id_detalle_venta = 1;

-- Actualizar un proveedor
UPDATE Proveedor
SET telefono = '88888888', correo_electronico = 'nuevo@correo.com'
WHERE id_proveedor = 1;

-- Eliminar un cliente
DELETE FROM Clientes
WHERE id_cliente = 3;

-- Eliminar un producto
DELETE FROM Productos
WHERE id_producto = 2;
 
-- Eliminar una venta
DELETE FROM Ventas
WHERE id_venta = 2;

-- Eliminar un detalle de venta
DELETE FROM Detalles_Ventas
WHERE id_detalle_venta = 1;

-- Eliminar un proveedor
DELETE FROM Proveedor
WHERE id_proveedor = 2;

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
ADD CONSTRAINT fk_marca
FOREIGN KEY (id_marca) REFERENCES Marca(id_marca);

-- Relación entre Productos y Categoría
ALTER TABLE Productos
ADD CONSTRAINT fk_categoria
FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria);

-- Relación entre Compras y Detalles_Compras
ALTER TABLE Detalles_Compras
ADD CONSTRAINT fk_compra
FOREIGN KEY (id_compra) REFERENCES Compras(id_compra);

-- Relación entre Compras y Proveedores
ALTER TABLE Compras
ADD CONSTRAINT fk_proveedor
FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor);

ALTER TABLE compras
add id_tiempo int;

ALTER TABLE compras 
ADD CONSTRAINT fk_tiempo
FOREIGN KEY (id_tiempo) REFERENCES Tiempo(id_tiempo);

ALTER TABLE ventas
ADD id_tiempo int;

ALTER TABLE ventas 
ADD CONSTRAINT fk_tiemp
FOREIGN KEY (id_tiempo) REFERENCES Tiempo(id_tiempo);


ALTER TABLE detalles_compras
ADD CONSTRAINT fk_productos
FOREIGN KEY (id_producto) REFERENCES productos(id_producto);