import express from 'express';
import { register, login } from './controller/authController';
import { authenticateToken } from './middleware/authMiddleware';
import type { AuthRequest } from './types/AuthRequest';

const app = express();
app.use(express.json());

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

app.post('/register', asyncHandler(register));
app.post('/login', asyncHandler(login));

app.get('/protected', authenticateToken, (req: AuthRequest, res) => {
    res.json({ message: 'Esta é uma rota protegida', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
