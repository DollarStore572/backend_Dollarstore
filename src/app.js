import express from 'express';
import cors from 'cors';
import rutasClientes from './routes/clientes.routes.js';
import rutasUsuarios from './routes/usuarios.routes.js';
import rutasProductos from './routes/productos.routes.js';
import rutasVentas from './routes/ventas.routes.js';
import rutasProveedores from './routes/proveedores.routes.js';
import rutasCategorias from './routes/categorias.routes.js';
import rutasMarcas from './routes/marcas.routes.js';
import rutasCompras from './routes/compras.routes.js';
import rutasDetalleCompras from './routes/detalle_compras.routes.js';




const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api', rutasClientes);
app.use('/api', rutasUsuarios);
app.use('/api', rutasProductos);
app.use('/api', rutasVentas);
app.use('/api', rutasProveedores);
app.use('/api', rutasCategorias);
app.use('/api', rutasMarcas);
app.use('/api', rutasCompras);
app.use('/api', rutasDetalleCompras);


// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
    });
});

export default app;