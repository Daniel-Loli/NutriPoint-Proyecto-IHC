import { Router } from 'express';
import path from 'path';

const router = Router();

// Obtener la ruta absoluta del directorio public
const publicPath = path.resolve('public');

router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'home.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(publicPath, 'register.html'));
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(publicPath, 'dashboard.html'));
});

export default router;
