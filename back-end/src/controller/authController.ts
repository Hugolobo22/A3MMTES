import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { user } from '../db/schema/user';
import { db } from '../db/conection';
import { eq } from 'drizzle-orm';

const SECRET_KEY = process.env.JWT_SECRET || 'secret123';

export const register = async (req: Request, res: Response) => {
    const { name, email, senha } = req.body;

    try {

        const existingUser = await db.select().from(user).where(eq(user.email, email));

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        await db.insert(user).values({
            name,
            email,
            senha: hashedPassword
        });

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        const foundUsers = await db.select().from(user).where(eq(user.email, email));

        if (foundUsers.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const foundUser = foundUsers[0];

        const validPassword = await bcrypt.compare(senha, foundUser.senha);
        if (!validPassword) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { id: foundUser.id, email: foundUser.email, name: foundUser.name },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};
