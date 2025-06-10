import type { Request } from 'express';

export interface AuthRequest extends Request {
    user?: any; // ou defina um tipo específico do seu token se quiser (id, email, etc)
}