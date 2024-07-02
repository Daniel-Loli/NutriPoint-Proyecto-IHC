import 'dotenv/config';
import express from 'express';
import path from 'path';
import userRouter from './routes/user.route.js';
import publicRouter from './routes/public.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', publicRouter);  // Ruta raíz y otras rutas públicas
app.use('/api/v1/users', userRouter);  // Rutas para usuarios (login, register, etc.)

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor andando en http://localhost:${PORT}`));
