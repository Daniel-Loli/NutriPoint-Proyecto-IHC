import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middlware.js';

const router = Router();

// Rutas para la gestión de usuarios
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Ejemplo de corrección para la ruta GET /dashboard
router.get('/dashboard', verifyToken, (req, res) => {
    // Esta función maneja la solicitud GET para /dashboard
    // Aquí puedes realizar cualquier lógica necesaria antes de enviar la respuesta
    res.send('Dashboard route');
});

export default router;
